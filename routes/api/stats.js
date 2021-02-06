const express = require("express");

const router = express.Router();
const Stat = require("../../models/Stat");

const connectDB = require("../../config/db");

const STAT_PROJECT = {
  country_iso2s: 0,
  country_iso3s: 0,
  combined_names: 0,
  uids: 0,
  country_codes: 0,
};

router.get("/latest/:days", async (req, res) => {
  await connectDB();

  try {
    const date = new Date(
      new Date(
        new Date().setDate(new Date().getDate() - req.params.days)
      ).setUTCHours(0, 0, 0, 0)
    );
    const QUERY = { $and: [{ date }, { country_codes: { $ne: [] } }] };
    const OPTIONS = { sort: { country: 1 } };

    const stats = await Stat.find(QUERY, STAT_PROJECT, OPTIONS);

    return stats.length > 0
      ? res.status(200).json({ date, stats })
      : res.status(404).json({ msg: "No available data for this date." });
  } catch (err) {
    return res.status(400).json({ msg: "Query error.", err });
  }
});

router.get("/country/:country", async (req, res) => {
  await connectDB();

  try {
    const QUERY = {
      $and: [{ country: req.params.country }, { country_codes: { $ne: [] } }],
    };
    const OPTIONS = { sort: { date: -1 } };

    const stats = await Stat.find(QUERY, STAT_PROJECT, OPTIONS);

    return stats.length > 0
      ? res.status(200).json({ country: req.params.country, stats })
      : res.status(404).json({ msg: "No available data for this country." });
  } catch (err) {
    return res.status(400).json({ msg: "Query error.", err });
  }
});

module.exports = router;

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

router.get("/latest", async (req, res) => {
  await connectDB();

  try {
    const latest = await Stat.findOne().sort("-date");

    const QUERY = {
      $and: [{ date: latest.date }, { country_codes: { $ne: [] } }],
    };
    const OPTIONS = { sort: { country: 1 } };

    const stats = await Stat.find(QUERY, STAT_PROJECT, OPTIONS);

    return stats.length > 0
      ? res.status(200).json({ date: latest.date, stats })
      : res
          .status(404)
          .json({ date: latest.date, msg: "No available data for this date." });
  } catch (err) {
    return res.status(400).json({ msg: "Query error.", err });
  }
});

router.get("/country/:country", async (req, res) => {
  await connectDB();

  try {
    const { country } = req.query;
    const QUERY = {
      $and: [{ country: req.params.country }, { country_codes: { $ne: [] } }],
    };
    const OPTIONS = { sort: { date: -1 } };

    const stats = await Stat.find(QUERY, STAT_PROJECT, OPTIONS);

    return stats.length > 0
      ? res.status(200).json({ country, stats })
      : res
          .status(404)
          .json({ country, msg: "No available data for this country." });
  } catch (err) {
    return res.status(400).json({ msg: "Query error.", err });
  }
});

router.get("/date/:year/:month/:date", async (req, res) => {
  await connectDB();

  const { year, month, date } = req.params;
  const queryDate = new Date(
    new Date(new Date().setUTCFullYear(year, month - 1, date)).setUTCHours(
      0,
      0,
      0,
      0
    )
  ).toISOString();

  try {
    const QUERY = {
      $and: [{ date: queryDate }, { country_codes: { $ne: [] } }],
    };
    const OPTIONS = { sort: { country: 1 } };

    const stats = await Stat.find(QUERY, STAT_PROJECT, OPTIONS);

    return stats.length > 0
      ? res.status(200).json({ date: queryDate, stats })
      : res
          .status(404)
          .json({ date: queryDate, msg: "No available data for this date." });
  } catch (err) {
    return res.status(400).json({ msg: "Query error.", err });
  }
});

module.exports = router;

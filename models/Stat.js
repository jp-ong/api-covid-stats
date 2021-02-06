const mongoose = require("mongoose");
const { Schema } = mongoose;

const StatSchema = Schema({ date: Date, country: String });

module.exports =
  mongoose.models.Stat ||
  mongoose.model("Stat", StatSchema, "countries_summary");

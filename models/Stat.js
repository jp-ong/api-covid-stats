const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports =
  mongoose.models.Stat || mongoose.model("Stat", Schema(), "countries_summary");

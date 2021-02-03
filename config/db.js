const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    // console.log(`Existing connection...`);
    return;
  }
  try {
    return await mongoose.connect(MONGO_URI, OPTIONS);
    // return console.log("New connection...");
  } catch (err) {
    // console.log(`Error connection...`)
    return;
  }
};

module.exports = connectDB;

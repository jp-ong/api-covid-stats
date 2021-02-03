const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/stats", require("./routes/api/stats"));
app.use("/", (req, res) => {
  res.status(200).json({
    latest: "/api/stats/latest/:days",
    country: "/api/stats/country/:country",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

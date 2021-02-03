const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const app = express();

app.use(express.json());
app.use(cors());

require("./config/db")();

app.use("/api/stats", require("./routes/api/stats"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

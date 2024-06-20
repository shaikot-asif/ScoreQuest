const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoConnect = require("./config/db.js");
const path = require("path");

//routes
const userRoutes = require("./routes/userRoutes.js");
const playerRoutes = require("./routes/playerRoutes.js");

dotenv.config();
mongoConnect();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/players", playerRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

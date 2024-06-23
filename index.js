const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoConnect = require("./config/db.js");
const path = require("path");
const {
  errorResponserHandler,
  invalidPathHandler,
} = require("./middleware/errorHandler.js");

//routes
const userRoutes = require("./routes/userRoutes.js");
const playerRoutes = require("./routes/playerRoutes.js");
const squadRoutes = require("./routes/squadRoute.js");

dotenv.config();
mongoConnect();
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorResponserHandler);

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/squad", squadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

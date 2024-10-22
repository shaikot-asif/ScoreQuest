const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoConnect = require("./config/db.js");
const path = require("path");
const { errorResponserHandler } = require("./middleware/errorHandler");

//routes
const userRoutes = require("./routes/userRoutes.js");
const playerRoutes = require("./routes/playerRoutes.js");
const squadRoutes = require("./routes/squadRoute.js");
const matchRoutes = require("./routes/matchRoutes.js");

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
app.use("/api/squad", squadRoutes);
app.use("/api/match", matchRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(errorResponserHandler);

const PORT = process.env.PORT || 51111;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoConnect = require("./config/db.js");

//routes
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();
mongoConnect();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

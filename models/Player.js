const { Schema, model, Types } = require("mongoose");

const StatisticsSchema = new Schema({
  totalRun: { type: Number, default: 0 },
  totalWicket: { type: Number, default: 0 },
});

const PlayerSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    birthday: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Batsman", "Bowler", "All-Rounder"],
    },
    statistics: { type: StatisticsSchema, default: {} },
  },
  { timestamps: true }
);

const Player = model("Player", PlayerSchema);

module.exports = Player;
const { Schema, model, Types } = require("mongoose");

const PlayerStatSchema = new Schema(
  {
    playerId: { type: Types.ObjectId, ref: "Player", required: true },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: String, default: 0.0 },
  },
  { _id: false }
);

const ScoreSchema = new Schema(
  {
    playerStats: [PlayerStatSchema],
    totalRuns: { type: Number, default: 0 },
    totalWickets: { type: Number, default: 0 },
    totalOvers: { type: String, default: 0.0 },
  },
  { _id: false }
);

const TeamSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
  },
  { _id: false }
);

const SquadSchema = new Schema(
  {
    squadId: { type: Types.ObjectId, ref: "Squad" },
  },
  { _id: false }
);

const MatchSchema = new Schema(
  {
    date: { type: Date, required: true },
    teams: {
      requestingTeam: { type: TeamSchema, required: true },
      requestedTeam: { type: TeamSchema, required: true },
    },
    score: {
      requestingTeam: { type: ScoreSchema, default: {} },
      requestedTeam: { type: ScoreSchema, default: {} },
    },
    squads: {
      requestingTeamSquad: { type: SquadSchema, default: {} },
      requestedTeamSquad: { type: SquadSchema, default: {} },
    },
    // toss: {
    //   tossWinner: { type: Types.ObjectId, ref: "User", default: null },
    //   inningsType: { type: String, enum: ["Bat", "Bowl"], default: "" },
    // },

    // switchPermission: {},

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancel", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Match = model("Match", MatchSchema);

module.exports = Match;

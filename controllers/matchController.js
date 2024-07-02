const Match = require("../models/match.js");

const addANewMatch = async (req, res, next) => {
  try {
    const matchValues = req.body;

    console.log(matchValues);

    const requestingTeam = matchValues.teams.requestingTeam.userId;
    const requestedTeam = matchValues.teams.requestedTeam.userId;
    const date = matchValues.date;
    const requestingTeamSquad = matchValues.squads.requestingTeamSquad.squadId;

    const match = new Match({
      date,
      teams: {
        requestingTeam: { userId: requestingTeam },
        requestedTeam: { userId: requestedTeam },
      },
      squads: {
        requestingTeamSquad: { squadId: requestingTeamSquad },
      },
    });

    await match.save();

    res.status(201).json(match);
  } catch (e) {
    console.log(e);
  }
};

const updateMatch = async (req, res, next) => {
  try {
    const {
      requestingTeam,
      requestedTeam,
      requestingTeamSquad,
      requestedTeamSquad,
      accepted,
      rejected,
    } = req.body;

    const { matchId } = req.query;

    let trackReject = false;

    let match = await Match.findById({ _id: matchId });

    if (!match) {
      let error = new Error("Match not found");

      error.statusCode = 404;
      next(error);
    }

    if (accepted) {
      match.status = "accepted";
      match.squads.requestedTeamSquad.squadId = requestedTeamSquad;
    } else if (rejected) {
      match.status = "rejected";
      match.save();
      res.send(match);
    }

    await match.save();

    res.send(match);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { addANewMatch, updateMatch };

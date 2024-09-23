const Match = require("../models/match.js");

const checkForExistingMatches = async (requestedTeam, date) => {
  const dateToDateString = new Date(date).toDateString();

  const matches = await Match.find({
    // status: ["pending", "accepted"],
    $or: [
      { "teams.requestingTeam.userId": requestedTeam },
      { "teams.requestedTeam.userId": requestedTeam },
    ],
  });

  const hasMatchValue = matches.map((item, index) => {
    let date = new Date(item.date.toDateString());

    console.log(date.toDateString() === dateToDateString, "from map");
    return date.toDateString() === dateToDateString && matches.length > 0;
  });

  return hasMatchValue;
};

const addANewMatch = async (req, res, next) => {
  try {
    const matchValues = req.body;

    const requestingTeam = matchValues.teams.requestingTeam.userId;
    const requestedTeam = matchValues.teams.requestedTeam.userId;

    console.log(
      requestingTeam,
      "requesting team",
      requestedTeam,
      "requestedTeam"
    );

    const date = matchValues.date;
    const requestingTeamSquad = matchValues.squads.requestingTeamSquad.squadId;

    const requestedTeamHasMatch = await checkForExistingMatches(
      requestedTeam,
      date
    );

    let hasMatch = false;

    if (requestedTeamHasMatch.length === 0) {
      hasMatch = false;
    } else {
      hasMatch = true;
    }

    console.log(requestedTeamHasMatch, "from add match");

    if (hasMatch) {
      const error = new Error("They have a match on this day");
      error.statusCode = 400; // Set custom status code
      return next(error); // Pass the error to the next middleware (error handler)
    }

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

    console.log(rejected, matchId);

    let match = await Match.findById({ _id: matchId });

    if (!match) {
      let error = new Error("Match not found");
      error.statusCode = 404;
      return next(error);
    }

    if (accepted) {
      match.status = "accepted";
      await match.save();
    } else if (rejected) {
      match.status = "rejected";
      await match.save();
      res.send(match);
    }

    await match.save();

    res.send(match);
  } catch (e) {
    console.log(e);
  }
};

const getMatchByRequestingTeamId = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      let error = new Error("User ID is required");
      error.statusCode = 400;
      return next(error);
    }

    const requestingTeamMatches = await Match.find({
      "teams.requestingTeam.userId": userId,
    });

    if (!requestingTeamMatches.length) {
      let error = new Error("There are no matches");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(requestingTeamMatches);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

const getMatchByRequestedTeamId = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      let error = new Error("User ID is required");
      error.statusCode = 400;
      return next(error);
    }

    const requestedTeam = await Match.find({
      "teams.requestedTeam.userId": userId,
    });
    if (!requestedTeam.length) {
      let error = new Error("There are no match");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(requestedTeam);
  } catch (e) {
    console.log(e);
  }
};

const cancelMatch = async (req, res, next) => {
  const { matchId } = req.query;
  const match = await Match.findById(matchId);
  if (!match) {
    let error = new Error("There are no match found");
    error.statusCode = 404;
    return next(error);
  }
  await match.deleteOne();
  res.json({ message: "match deleted successfully" });
};

module.exports = {
  addANewMatch,
  updateMatch,
  getMatchByRequestingTeamId,
  getMatchByRequestedTeamId,
  cancelMatch,
};

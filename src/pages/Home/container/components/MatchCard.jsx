import React from "react";

const MatchCard = ({ match, parentClass }) => {
  return (
    <div
      className={`${parentClass} p-6 rounded-md shadow hover:shadow-sm transition-all duration-150`}
    >
      <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2">
        {match.team1} vs {match.team2}
      </h3>
      <div className="border-t border-secondary-slateGray py-4">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-primary-darkNavy">Batting Team:</span>
          <span className="text-secondary-slateGray">{match.battingTeam}</span>
        </div>
        <div className="mb-4">
          <div className="text-secondary-slateGray">
            <span className="font-semibold">Player 1:</span> {match.player1.run}{" "}
            runs / {match.player1.ball} balls
          </div>
          <div className="text-secondary-slateGray">
            <span className="font-semibold">Player 2:</span> {match.player2.run}{" "}
            runs / {match.player2.ball} balls
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <span className="font-bold text-primary-darkNavy">Bowling Team:</span>
          <span className="text-secondary-slateGray">{match.bowlingTeam}</span>
        </div>
        <div className="text-secondary-slateGray">
          <span className="font-semibold">Bowler:</span> {match.bowler} -{" "}
          {match.currentOver} overs
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

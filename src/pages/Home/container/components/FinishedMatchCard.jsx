import React from "react";

const FinishedMatchCard = ({ match, parentClass }) => {
  return (
    <div
      className={`${parentClass} p-6 rounded-md shadow hover:shadow-sm transition-all duration-150 w-[100%] md:w-[48%] lg:w-[31%] `}
    >
      <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2">
        {match.team1} vs {match.team2}
      </h3>
      <div className="border-t border-secondary-slateGray py-4">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-primary-darkNavy">{match.team1}</span>
          <span className="text-secondary-slateGray">
            {match.Team1.run} / {match.Team1.over}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="font-bold text-primary-darkNavy">{match.team2}</span>
          <span className="text-secondary-slateGray">
            {match.Team2.run} / {match.Team2.over}
          </span>
        </div>
        <div className="text-secondary-slateGray">
          <span className="font-semibold">Team is win the match by 8 runs</span>
        </div>
      </div>
    </div>
  );
};

export default FinishedMatchCard;

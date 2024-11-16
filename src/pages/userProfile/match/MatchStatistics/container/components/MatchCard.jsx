import React, { useEffect, useState } from "react";
import { getDateDifference } from "../../../../../../utils/getDateDifference";

const MatchCard = ({ match, parentClass }) => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (minute / 60 < 24) {
        setSecond(getDateDifference(new Date(match?.date), new Date()).seconds);
      }

      setMinute(getDateDifference(new Date(match?.date), new Date()).minutes);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div
      className={`${parentClass} p-6 rounded-md shadow hover:shadow-sm transition-all duration-150`}
    >
      <h3 className="text-xl cursor-pointer font-semibold text-primary-brightOrange text-center mb-2">
        {match?.teams?.requestingTeam?.name} vs{" "}
        {match?.teams?.requestedTeam?.name}
      </h3>
      <div className="border-t border-secondary-slateGray py-4">
        <div>
          {match?.toss?.tossWinner ? (
            match?.toss?.tossWinner.toString() ===
            match?.teams?.requestingTeam?.userId.toString() ? (
              <p>
                {match?.teams?.requestingTeam?.name} Wine the Toss{" "}
                {match?.toss?.inningsType &&
                  "and opt to " + match?.toss?.inningsType}
              </p>
            ) : (
              <p>
                {match?.teams?.requestedTeam?.name} Wine The Toss{" "}
                {match?.toss?.inningsType &&
                  "and opt to " + match?.toss?.inningsType}
              </p>
            )
          ) : (
            <div className="text-secondary-slateGray flex flex-row gap-1">
              <span className="font-semibold">Remaining:</span>

              <span className="">
                {minute / 60 > 24
                  ? parseInt(minute / 60 / 24) +
                    "D  " +
                    (parseInt(minute / 60) % 24) +
                    "H"
                  : minute / 60 < 24 &&
                    parseInt(minute / 60) +
                      "H " +
                      parseInt(minute % 60) +
                      "M " +
                      second +
                      " S"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

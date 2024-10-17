import React from "react";

const MatchCard = () => {
  return (
    <div className="[box-shadow:0px_0px_10px_-2px_rgba(255,_255,_255,_0.7);] px-6 py-8 rounded-md">
      <div className="flex flex-col gap-y-3">
        <h4 className="text-center font-bold text-[22px] text-accentColor-skyBlur ">
          Team1 vs Team2
        </h4>

        <h5>Batting Team : Team1</h5>
        <span>
          <strong>Batting player1:</strong> <span>run: 20 / ball: 12</span>
          <br />
          <strong>Batting player2:</strong> <span>run: 22 / ball: 9</span>
        </span>

        <h5>Bowling Team: Team2</h5>
        <span>
          <strong>Bowling player:</strong> <span>current ball occurs.</span>{" "}
          <span>13/2.3</span>{" "}
        </span>
      </div>
    </div>
  );
};

export default MatchCard;

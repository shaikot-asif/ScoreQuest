import React from "react";
import HeadingH3 from "../../../components/shared/HeadingH3";
import MatchCard from "./components/MatchCard";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";

const matches = [
  {
    team1: "Team 1",
    team2: "Team 2",
    battingTeam: "Team 1",
    player1: { run: 20, ball: 12 },
    player2: { run: 22, ball: 9 },
    bowlingTeam: "Team 2",
    bowler: "Player 4",
    currentOver: "13/2.3",
  },
  {
    team1: "Team 3",
    team2: "Team 4",
    battingTeam: "Team 3",
    player1: { run: 15, ball: 10 },
    player2: { run: 25, ball: 18 },
    bowlingTeam: "Team 4",
    bowler: "Player 5",
    currentOver: "11/2.1",
  },
  {
    team1: "Team 3",
    team2: "Team 4",
    battingTeam: "Team 3",
    player1: { run: 15, ball: 10 },
    player2: { run: 25, ball: 18 },
    bowlingTeam: "Team 4",
    bowler: "Player 5",
    currentOver: "11/2.1",
  },
  {
    team1: "Team 3",
    team2: "Team 4",
    battingTeam: "Team 3",
    player1: { run: 15, ball: 10 },
    player2: { run: 25, ball: 18 },
    bowlingTeam: "Team 4",
    bowler: "Player 5",
    currentOver: "11/2.1",
  },
  {
    team1: "Team 3",
    team2: "Team 4",
    battingTeam: "Team 3",
    player1: { run: 15, ball: 10 },
    player2: { run: 25, ball: 18 },
    bowlingTeam: "Team 4",
    bowler: "Player 5",
    currentOver: "11/2.1",
  },
];
const TodayMatch = () => {
  return (
    <div className="container px-4 xl:px-0 block m-auto mt-[100px] sm:mt-[150px] ">
      <HeadingH3 text={"Today's Match"} classes={"mb-5"} />

      <div className="flex flex-wrap gap-5 md:flex-row justify-center">
        {matches.map((match, index) => (
          <MatchCard
            match={match}
            key={index}
            parentClass={"w-[100%] md:w-[48%] lg:w-[31%] "}
          />
        ))}
      </div>
      <div className="flex justify-center mt-16 ">
        <SecondaryButton text={"See More"} />
      </div>
    </div>
  );
};

export default TodayMatch;

import React from "react";
import HeadingH3 from "../../../components/shared/HeadingH3";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";
import FinishedMatchCard from "./components/FinishedMatchCard";

const matches = [
  {
    team1: "Team 1",
    team2: "Team 2",
    Team1: { run: 20, over: 12 },
    Team2: { run: 22, over: 12 },
  },
  {
    team1: "Team 1",
    team2: "Team 2",
    Team1: { run: 20, over: 12 },
    Team2: { run: 22, over: 12 },
  },
  {
    team1: "Team 1",
    team2: "Team 2",
    Team1: { run: 20, over: 12 },
    Team2: { run: 22, over: 12 },
  },
  {
    team1: "Team 1",
    team2: "Team 2",
    Team1: { run: 20, over: 12 },
    Team2: { run: 22, over: 12 },
  },
];
const FinishedMatch = () => {
  return (
    <div className="container px-4 xl:px-0 block m-auto mt-[100px] sm:mt-[150px] ">
      <HeadingH3 text={"Finished Match"} classes={"mb-5"} />

      <div className="flex flex-col gap-4 md:flex-row flex-wrap justify-center">
        {matches.map((match, index) => (
          <FinishedMatchCard match={match} key={index} />
        ))}
      </div>
      <div className="flex justify-center mt-16 ">
        <SecondaryButton text={"See More"} />
      </div>
    </div>
  );
};

export default FinishedMatch;

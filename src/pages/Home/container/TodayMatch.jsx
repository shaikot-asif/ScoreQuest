import React from "react";
import HeadingH3 from "../../../components/shared/HeadingH3";
import MatchCard from "./components/MatchCard";

const TodayMatch = () => {
  return (
    <div className="container block m-auto mt-[150px] ">
      <HeadingH3 text={"Today's Match"} classes={"mb-5"} />

      <div className="flex flex-wrap gap-x-4 gap-y-10 justify-evenly flex-row">
        <div className="w-[46%]">
          <MatchCard />
        </div>
        <div className="w-[46%]">
          <MatchCard />
        </div>
        <div className="w-[46%]">
          <MatchCard />
        </div>
        <div className="w-[46%]">
          <MatchCard />
        </div>
      </div>
    </div>
  );
};

export default TodayMatch;

import React from "react";
import HeadingH3 from "../../../../components/shared/HeadingH3";
import Search from "../../../../components/Search";
import MatchCard from "./MatchCard";

const TodayMatchCart = ({ setSearchKeywords, match }) => {
  return (
    <div className="container px-4 xl:px-0 block m-auto my-28 ">
      <HeadingH3 text={"Today's Match"} classes={"mb-5"} />
      <div className="self-center mb-10 sm:w-[40%] m-auto ">
        <Search
          placeholder="Find Match By Club / Area name"
          setSearchKeywords={setSearchKeywords}
        />
      </div>

      <div className="flex flex-wrap gap-5 md:flex-row justify-center">
        {match?.length === 0 ? (
          <p className="text-[20px] text-secondary-goldenPoppy ">
            There have no today match
          </p>
        ) : (
          match?.map((match, index) => (
            <MatchCard
              match={match}
              key={index}
              parentClass={"w-[100%] md:w-[48%] lg:w-[31%] "}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodayMatchCart;

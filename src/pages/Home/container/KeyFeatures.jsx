import React from "react";
import { MdUpdate } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import { SiPagespeedinsights } from "react-icons/si";
import { BsUniversalAccessCircle } from "react-icons/bs";
import FeaturesCard from "./components/FeaturesCard";
import HeadingH3 from "../../../components/shared/HeadingH3";

const KeyFeatures = () => {
  return (
    <div className="container block m-auto">
      {/* <h5 className="text-center text-[38px] font-bold text-primary-darkNavy pb-3 ">
        Key Features
      </h5> */}
      <HeadingH3 text={"Why Choose ScoreQuest?"} />
      <div className="flex gap-5 justify-evenly mt-10">
        <div>
          <FeaturesCard
            icon={<MdUpdate />}
            text={
              "Monitor individual player performance with up-to-the-minute stats for every player on the field."
            }
            title={"Detailed Player Stats"}
          />
        </div>
        <div>
          <FeaturesCard
            icon={<TfiStatsUp />}
            text={
              "Get a detailed breakdown of each match, from innings progress to detailed over-by-over analysis."
            }
            title={"Match Insights"}
          />
        </div>
        <div>
          <FeaturesCard
            icon={<SiPagespeedinsights />}
            text={
              "Track live matches from any device – desktop, tablet, or mobile, no matter where you are."
            }
            title={"Accessible Anytime, Anywhere"}
          />
        </div>
        <div>
          <FeaturesCard
            icon={<BsUniversalAccessCircle />}
            text={
              "Get live, ball-by-ball score updates and track every run, wicket, and over as it happens."
            }
            title={"Real-Time Scoring"}
          />
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;

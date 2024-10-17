import React from "react";
import {
  MdAppRegistration,
  MdEmergencyShare,
  MdOutlineScoreboard,
} from "react-icons/md";
import FeaturesCard from "./components/FeaturesCard";
import HeadingH3 from "../../../components/shared/HeadingH3";
const HowItWorks = () => {
  return (
    <div className="container block m-auto mt-[150px] ">
      <HeadingH3 text={"How ScoreQuest Works"} />

      <div className="flex gap-5 justify-evenly mt-10">
        <div>
          <FeaturesCard
            icon={<MdAppRegistration />}
            text={
              "Sign up and create a team profile. Get your local cricket games into ScoreQuest."
            }
            title={"Register Your Team"}
          />
        </div>
        <div>
          <FeaturesCard
            icon={<MdOutlineScoreboard />}
            text={
              "Start the match and track every ball. Add player stats, runs, overs, and wickets in real-time."
            }
            title={"Start Scoring"}
          />
        </div>
        <div>
          <FeaturesCard
            icon={<MdEmergencyShare />}
            text={
              "Share live scores with your teammates, fans, or even on social media in real-time."
            }
            title={"Share & View Scores"}
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

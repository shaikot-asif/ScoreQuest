import React from "react";
import images from "../../../constants/images";
import PrimaryButton from "../../../components/shared/button/PrimaryButton";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";

const Hero = () => {
  return (
    <div className="container block m-auto overflow-x-hidden text-center">
      <div className="flex flex-row justify-between mt-24 mb-[200px]">
        <div className="translate-x-[-45px] translate-y-[130px]">
          <img width={300} src={images.hero} alt="" />
        </div>
        <div>
          <h1 className="text-primary-brightOrange text-5xl leading-tight font-bold">
            Track Every Ball in Real-Time with ScoreQuest.
          </h1>
          <p className="text-secondary-slateGray text-[16px] leading-6 pt-7">
            Leave behind the pen and paper. Experience the ease of real-time
            live scoring, detailed player stats, and instant match updates – all
            from your mobile or desktop.
          </p>
        </div>
        <div className="translate-x-[45px] translate-y-[130px]">
          <img width={300} src={images.hero} alt="" />
        </div>
      </div>
      <div className="justify-center translate-y-[-200px] flex items-center gap-4 ">
        <PrimaryButton text={"Get Started"} />
        <SecondaryButton text={"Explore Live Match"} />
      </div>
    </div>
  );
};

export default Hero;

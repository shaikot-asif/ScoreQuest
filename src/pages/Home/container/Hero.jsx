import React from "react";
import images from "../../../constants/images";
import PrimaryButton from "../../../components/shared/button/PrimaryButton";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const Hero = () => {
  const userState = useSelector((state) => state.user);
  return (
    <div
      className={` relative h-[100vh] px-5 mt-0 xl:px-0 h-80vh block m-auto overflow-x-hidden text-center bg=[url(${images.heroVideo})] `}
    >
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source className="" src={images.heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"></div>
      <motion.div className=" mt-24 md:mt-44 md:w-3/4 m-auto mb-[200px] relative">
        <motion.h1
          className="text-primary-brightOrange  text-natural-white text-left text-3xl md:text-5xl md:text-center leading-tight font-bold"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }} // Runs only once when section is in view
        >
          Track Every Ball in Real-Time with ScoreQuest.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }} // Runs only once when section is in view
          className="text-secondary-slateGray text-natural-white text-[16px] text-left md:text-center leading-6 pt-7"
        >
          Leave behind the pen and paper. Experience the ease of real-time live
          scoring, detailed player stats, and instant match updates – all from
          your mobile or desktop.
        </motion.p>
      </motion.div>
      <div className="md:justify-center translate-y-[-185px] flex flex-col md:flex-row items-start md:items-center gap-4 ">
        {!userState.userInfo && (
          <Link to={"/signup"}>
            <PrimaryButton text={"Get Started"} />
          </Link>
        )}
        <Link to={"/today-match"}>
          <SecondaryButton text={"Explore Live Match"} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;

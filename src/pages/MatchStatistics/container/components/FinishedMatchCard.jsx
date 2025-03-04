import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FinishedMatchCard = ({
  match,
  parentClass,
  y = 0,
  x = 0,
  initialX = 0,
  initialY = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: x }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
      className={`${parentClass} p-6 rounded-md  w-[100%] md:w-[44%]  bg-primary-midNight text-natural-white `}
    >
      <Link
        to={`/match-statistics/${match?._id}`}
        className="text-xl font-semibold text-primary-brightOrange text-center block mb-2"
      >
        {match?.teams?.requestingTeam?.name} vs{" "}
        {match?.teams?.requestedTeam?.name}
      </Link>
      <div className="border-t border-secondary-slateGray py-4">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-primary-darkNavy">
            {match?.teams?.requestingTeam?.name}
          </span>
          <span className="text-secondary-slateGray">
            {match?.score?.requestingTeam?.totalRuns} /{" "}
            {parseInt(match?.score?.requestingTeam?.totalOvers / 6) +
              "." +
              parseInt(match?.score?.requestingTeam?.totalOvers % 6)}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="font-bold text-primary-darkNavy">
            {match?.teams?.requestedTeam?.name}
          </span>
          <span className="text-secondary-slateGray">
            {match?.score?.requestedTeam?.totalRuns} /{" "}
            {parseInt(match?.score?.requestedTeam?.totalOvers / 6) +
              "." +
              parseInt(match?.score?.requestedTeam?.totalOvers % 6)}
          </span>
        </div>
        <div className="text-secondary-slateGray">
          <span className="font-semibold text-secondary-goldenPoppy">
            {parseInt(match?.score?.requestedTeam?.totalRuns) <
            parseInt(match?.score?.requestingTeam?.totalRuns)
              ? match?.teams?.requestingTeam?.name + " win the match"
              : parseInt(match?.score?.requestedTeam?.totalRuns) >
                parseInt(match?.score?.requestingTeam?.totalRuns)
              ? match?.teams?.requestedTeam?.name + " win the match"
              : "Match Draw"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FinishedMatchCard;

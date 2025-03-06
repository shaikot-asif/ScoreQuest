import { motion } from "framer-motion";
import PrimaryButton from "../../../../../../../../../components/shared/button/PrimaryButton";

const StartMatchTimeCountCard = ({
  match,
  minute,
  second,
  userState,
  navigate,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {!match?.toss?.tossWinner && (
        <div className="bg-primary-midNight w-[90%] sm:w-[40%] p-5 rounded-md m-auto flex flex-col gap-3 mt-5">
          <h3 className="text-xl font-semibold text-secondary-goldenPoppy text-center mb-2 cursor-pointer">
            {match?.teams?.requestingTeam?.name || "unknown"} <br /> VS <br />
            {match?.teams?.requestedTeam?.name || "unknown"}
          </h3>
          <div className="text-natural-white  flex flex-col items-center justify-center gap-3">
            <span className="">
              {minute / 60 > 24
                ? parseInt(minute / 60 / 24) +
                  "D  " +
                  (parseInt(minute / 60) % 24) +
                  "H"
                : minute / 60 < 24 &&
                  parseInt(minute / 60) +
                    "H " +
                    parseInt(minute % 60) +
                    "M " +
                    second +
                    " S"}
            </span>

            {minute <= 300 &&
              userState.userInfo.id === match?.teams?.requestingTeam?.userId &&
              match?.status === "accepted" && (
                <span
                  onClick={() => navigate(`/profile/match/toss/${match?._id}`)}
                >
                  <PrimaryButton y={0} text={"Start Match?"} />
                </span>
              )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StartMatchTimeCountCard;

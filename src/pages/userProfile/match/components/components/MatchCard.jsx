import React, { useEffect, useState } from "react";
import Loading from "../../../../../components/shared/Loading/Loading";
import PrimaryButton from "../../../../../components/shared/button/PrimaryButton";
import SecondaryButton from "../../../../../components/shared/button/SecondaryButton";
import { useSelector } from "react-redux";
import Skeleton from "../../../../../components/shared/Loading/Skeleton";

const MatchCard = ({ item, classes }) => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const userState = useSelector((state) => state.user);
  console.log(item, "data");

  function getDateDifference(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);

    const totalSeconds = Math.floor(diffInMs / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes, seconds, diffInMs };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (minute / 60 < 24) {
        setSecond(getDateDifference(new Date(item.date), new Date()).seconds);
      }
      setMinute(getDateDifference(new Date(item.date), new Date()).minutes);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`${classes} w-[48%] flex flex-col gap-3 p-6 rounded-md shadow hover:shadow-sm transition-all duration-150`}
      key={item?._id}
    >
      <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
        {item.teams.requestingTeam.name || "unknown"} <br /> VS <br />
        {item.teams.requestedTeam.name || "unknown"}
      </h3>
      <span className="w-full block h-[1px] bg-primary-brightOrange "></span>

      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Status:</span>

        <span className="">{item.status}</span>
      </div>
      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Date:</span>
        <span className="">{new Date(item.date).toLocaleString()}</span>
      </div>

      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Remaining:</span>

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
                " Second"}
        </span>
      </div>

      {item.status === "pending" &&
      item.teams.requestedTeam.userId === userState.userInfo.id ? (
        <div className="flex flex-row justify-between">
          <SecondaryButton text={"Cancel"} />

          <PrimaryButton text={"Accept"} />
        </div>
      ) : (
        item.status === "pending" && (
          <div>
            <SecondaryButton text={"Cancel"} />
          </div>
        )
      )}
    </div>
  );
};

export default MatchCard;

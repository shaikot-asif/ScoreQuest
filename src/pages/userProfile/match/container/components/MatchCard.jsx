import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../../../components/shared/button/PrimaryButton";
import SecondaryButton from "../../../../../components/shared/button/SecondaryButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDateDifference } from "../../../../../utils/getDateDifference";
import { format } from "date-fns";
import { adjustToLocalTime } from "../../../../../utils/adjusedTimeAndTImeZone";

const MatchCard = ({
  item,
  classes,
  setAutoCancel = null,
  handelClickDeleteMatch = null,
  handelClickAcceptMatch = null,
  AddMatchCard,
  setNote,
  note,
  setMatchValues,
  isAccept,
  matchData = null,
}) => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [clickedMatchId, setClickedMatchId] = useState("");

  const [isRejectNote, setIsRejectNote] = useState(false);
  const userState = useSelector((state) => state.user);

  console.log(
    format(adjustToLocalTime(item.date), "yyyy-MM-dd hh:mm:ss a"),
    "from console.log"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (minute / 60 < 24) {
        if (import.meta.env.VITE_ENVIROMENT === "development") {
          setSecond(
            getDateDifference(
              format(adjustToLocalTime(item.date), "yyyy-MM-dd hh:mm:ss a"),
              format(
                adjustToLocalTime(new Date().toISOString()),
                "yyyy-MM-dd hh:mm:ss a"
              )
            ).seconds
          );

          setMinute(
            getDateDifference(
              format(adjustToLocalTime(item.date), "yyyy-MM-dd hh:mm:ss a"),
              format(
                adjustToLocalTime(new Date().toISOString()),
                "yyyy-MM-dd hh:mm:ss a"
              )
            ).minutes
          );
        } else {
          setSecond(
            getDateDifference(
              format(adjustToLocalTime(item.date, -6), "yyyy-MM-dd hh:mm:ss a"),
              format(
                adjustToLocalTime(new Date().toISOString()),
                "yyyy-MM-dd hh:mm:ss a"
              )
            ).seconds
          );

          setMinute(
            getDateDifference(
              format(adjustToLocalTime(item.date, -6), "yyyy-MM-dd hh:mm:ss a"),
              format(
                adjustToLocalTime(new Date().toISOString()),
                "yyyy-MM-dd hh:mm:ss a"
              )
            ).minutes
          );
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (
      (new Date(item.date) === new Date() ||
        new Date() > new Date(item.date)) &&
      item.status === "pending"
    ) {
      if (typeof setAutoCancel === "function") {
        setAutoCancel(item._id);
      }
    }
  }, [item, setAutoCancel]);
  useEffect(() => {
    if (matchData !== null) {
      matchData.map((item) => {
        if (
          typeof setMatchValues === "function" &&
          item._id == clickedMatchId
        ) {
          return setMatchValues({
            teams: {
              requestingTeam: {
                name: item.teams.requestingTeam.name,
                userId: item.teams.requestingTeam.userId,
              },
              requestedTeam: {
                name: item.teams.requestedTeam.name,
                userId: item.teams.requestedTeam.userId,
              },
            },
            squads: {
              requestedTeamSquad: {
                squadId: "",
              },
            },
            date:
              import.meta.env.VITE_ENVIROMENT === "development"
                ? adjustToLocalTime(item.date, 6).toISOString().slice(0, 16)
                : adjustToLocalTime(item.date, -6).toISOString().slice(0, 16),
            venue: item.venue,
          });
        }
      });
    }
  }, [clickedMatchId]);

  const handelClickSetAcceptedMatch = (data) => {
    setClickedMatchId(data);
    handelClickAcceptMatch(data);
  };

  const handelRejectMatch = (data) => {
    handelClickDeleteMatch(data);
  };

  return (
    <div
      className={`${classes} w-full mx-1 mb-5 md:w-[48%] flex flex-col gap-3 p-6 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-lg transition-all duration-150`}
      key={item?._id}
    >
      <Link to={`${item._id}`}>
        <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
          {item.teams.requestingTeam.name || "unknown"} <br /> VS <br />
          {item.teams.requestedTeam.name || "unknown"}
        </h3>
      </Link>
      <span className="w-full block h-[1px] bg-primary-brightOrange "></span>

      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Status:</span>

        <span className="">{item.status}</span>
      </div>
      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Date:</span>
        <span className="">
          {import.meta.env.VITE_ENVIROMENT === "development"
            ? format(adjustToLocalTime(item.date), "yyyy-MM-dd hh:mm a")
            : format(adjustToLocalTime(item.date, -6), "yyyy-MM-dd hh:mm a")}
        </span>
      </div>

      <div className="text-secondary-slateGray flex flex-row gap-1">
        <span className="font-semibold">Venue:</span>

        <span className="">{item.venue}</span>
      </div>

      {!item.toss.tossWinner && (
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
                  " S"}
          </span>
        </div>
      )}

      {item.status === "completed" && (
        <div className="text-secondary-slateGray block">
          <span className="font-semibold text-center">
            {parseInt(item?.score?.requestedTeam?.totalRuns) <
            parseInt(item?.score?.requestingTeam?.totalRuns)
              ? item?.teams?.requestingTeam?.name + " win the match"
              : parseInt(item?.score?.requestedTeam?.totalRuns) >
                parseInt(item?.score?.requestingTeam?.totalRuns)
              ? item?.teams?.requestedTeam?.name + " win the match"
              : "Match Draw"}
          </span>
        </div>
      )}

      {item.status === "pending" &&
      item.teams.requestedTeam.userId === userState.userInfo.id ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <span onClick={() => setIsRejectNote(!isRejectNote)}>
              <SecondaryButton text={"Reject"} />
            </span>

            <span onClick={() => handelClickSetAcceptedMatch(item._id)}>
              <PrimaryButton text={"Accept"} />
            </span>
          </div>
          {isRejectNote && (
            <div className="w-full flex flex-row gap-5">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur border-secondary-slateGray"
                value={note}
                placeholder="Note"
                onChange={(e) => setNote(e.target.value)}
              />
              <span onClick={() => handelRejectMatch(item._id)}>
                <SecondaryButton text={"Ok"} />
              </span>
            </div>
          )}

          <div className="">{isAccept && AddMatchCard}</div>
        </div>
      ) : (
        (item.status === "pending" || item.status === "rejected") && (
          <div>
            <span onClick={() => handelClickDeleteMatch(item._id)}>
              <SecondaryButton text={"Cancel"} />
              {item.status === "rejected" && (
                <div>
                  <p className="text-primary-brightOrange font-bold">
                    {item.note && item.note}
                  </p>
                </div>
              )}
            </span>
          </div>
        )
      )}

      {item.status === "pending" &&
      item.teams.requestedTeam.userId === userState.userInfo.id ? (
        <span className="text-primary-brightOrange font-bold ">
          It will reject if you will not accept it within remaining time
        </span>
      ) : (
        item.status === "pending" && (
          <span className="text-primary-brightOrange font-bold ">
            It will reject if {item.teams.requestedTeam.name} will not accept it
            within remaining time
          </span>
        )
      )}
    </div>
  );
};

export default MatchCard;

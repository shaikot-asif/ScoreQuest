import React, { useEffect, useState } from "react";
import { getDateDifference } from "../../../../../../../utils/getDateDifference";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adjustToLocalTime } from "../../../../../../../utils/adjusedTimeAndTImeZone";
import { format } from "date-fns";
import StartMatchTimeCountCard from "./container/components/StartMatchTimeCountCard";

const StartMatchTImeCount = ({ match }) => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const interval = setInterval(() => {
      if (import.meta.env.VITE_ENVIROMENT === "development") {
        if (minute / 60 < 24) {
          setSecond(
            getDateDifference(
              format(adjustToLocalTime(match?.date), "yyyy-MM-dd hh:mm:ss a"),
              format(
                adjustToLocalTime(new Date().toISOString()),
                "yyyy-MM-dd hh:mm:ss a"
              )
            ).seconds
          );
        }
        setMinute(
          getDateDifference(
            format(adjustToLocalTime(match?.date), "yyyy-MM-dd hh:mm:ss a"),
            format(
              adjustToLocalTime(new Date().toISOString()),
              "yyyy-MM-dd hh:mm:ss a"
            )
          ).minutes
        );
      } else {
        if (minute / 60 < 24) {
          setSecond(
            getDateDifference(
              format(
                adjustToLocalTime(match?.date, -6),
                "yyyy-MM-dd hh:mm:ss a"
              ),
              format(
                adjustToLocalTime(new Date().toISOString()),
                "yyyy-MM-dd hh:mm:ss a"
              )
            ).seconds
          );
        }

        setMinute(
          getDateDifference(
            format(adjustToLocalTime(match?.date, -6), "yyyy-MM-dd hh:mm:ss a"),
            format(
              adjustToLocalTime(new Date().toISOString()),
              "yyyy-MM-dd hh:mm:ss a"
            )
          ).minutes
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [match]);

  return (
    <StartMatchTimeCountCard
      match={match}
      minute={minute}
      navigate={navigate}
      second={second}
      userState={userState}
    />
  );
};

export default StartMatchTImeCount;

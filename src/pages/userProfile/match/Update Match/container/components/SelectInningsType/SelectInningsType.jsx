import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SecondaryButton from "../../../../../../../components/shared/button/SecondaryButton";
import {
  getMatchByMatchId,
  updateOverAndTossWinner,
} from "../../../../../../../service/match";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../../../../components/shared/Loading/Loading";

const SelectInningsType = () => {
  const userState = useSelector((state) => state.user);
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [selectInnings, setSelectInnings] = useState("");

  const { data: match, isLoading } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByMatchId({
        matchId: matchId,
        token: userState.userInfo.token,
      }),
  });

  const { mutate } = useMutation({
    mutationKey: ["match"],
    mutationFn: ({ matchId, inningsType, token }) =>
      updateOverAndTossWinner({
        matchId,
        inningsType,
        token,
      }),
    onSuccess: (data) => {
      toast.success("Update Successfully");

      if (
        data?.match?.battingUser?.userId?.toString() === userState?.userInfo?.id
      ) {
        navigate(`/profile/match/update-match/${matchId}`);
      } else {
        navigate(`/match-statistics/${matchId}`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handelSubmit = () => {
    mutate({
      matchId: match?._id,
      token: userState?.userInfo?.token,
      inningsType: selectInnings,
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-primary-midNight rounded-md p-5 w-[95%] sm:w-[60%] xl:w-[40%] block m-auto ">
          <span className="text-center my-2 font-semibold capitalize text-secondary-goldenPoppy block">
            Congratulations{" "}
            {match?.toss?.tossWinner?.toString() ===
            match?.teams?.requestingTeam?.userId?.toString()
              ? match?.teams?.requestingTeam?.name
              : match?.teams?.requestedTeam?.name}{" "}
            Won The Toss
          </span>

          <div className="flex flex-col gap-5">
            <span className="mt-5 text-md font-semibold capitalize text-natural-white mb-[-15px] ">
              What{" "}
              {match?.toss?.tossWinner?.toString() ===
              match?.teams?.requestingTeam?.userId?.toString()
                ? match?.teams?.requestingTeam?.name
                : match?.teams?.requestedTeam?.name}{" "}
              decide?
            </span>
            <div className="flex flex-row justify-between">
              <h2
                onClick={() => setSelectInnings("Bat")}
                className={`border-secondary-goldenPoppy border transition-all duration-150 active:scale-95 text-natural-white p-5 rounded-md cursor-pointer capitalize ${
                  selectInnings === "Bat" &&
                  "bg-secondary-goldenPoppy !text-primary-midNight"
                }
       `}
              >
                Batting First
              </h2>

              <h2
                onClick={() => setSelectInnings("Bowl")}
                className={`border-secondary-goldenPoppy border transition-all duration-150 active:scale-95 text-natural-white p-5 rounded-md cursor-pointer capitalize 
                ${
                  selectInnings === "Bowl" &&
                  "bg-secondary-goldenPoppy !text-primary-midNight"
                }
             `}
              >
                Bowling First
              </h2>
            </div>
            <span onClick={handelSubmit}>
              <SecondaryButton y={0} text={"Submit"} classes={"w-full"} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectInningsType;

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { optionValues } from "../../../../../../../utils/optionValues";
import SecondaryButton from "../../../../../../../components/shared/button/SecondaryButton";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { updateOverAndTossWinner } from "../../../../../../../service/match";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const INIT = {
  over: 0,
  tossWinner: "",
  tossLooser: "",
  totalWickets: 0,
};

const TosWinnerOverWickets = ({ match, setNextPage }) => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [winnerDate, setWinnerDate] = useState({ ...INIT });

  const handelWinner = (data) => {
    setWinnerDate((prev) => ({ ...prev, tossWinner: data }));
  };

  const { mutate } = useMutation({
    mutationKey: ["match"],
    mutationFn: ({
      matchId,
      overs,
      token,
      tossLooserId,
      tossWinnerId,
      totalPlayers,
    }) =>
      updateOverAndTossWinner({
        matchId,
        overs,
        token,
        tossLooserId,
        tossWinnerId,
        totalPlayers,
      }),
    onSuccess: () => {
      toast.success("Update Successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handelSubmit = () => {
    console.log(winnerDate, "winer");
    if (
      winnerDate.over === INIT.over ||
      winnerDate.tossWinner === INIT.tossWinner
    ) {
      if (!winnerDate.over) {
        toast.error("Please select Over");
      }
      if (!winnerDate.tossWinner) {
        toast.error("Please select toss winner");
      }
    } else {
      mutate({
        matchId: match?._id,
        overs: winnerDate.over,
        token: userState.userInfo.token,
        tossLooserId: winnerDate.tossLooser,
        tossWinnerId: winnerDate.tossWinner,
        totalPlayers: winnerDate.totalWickets,
      });
    }
  };

  useEffect(() => {
    if (winnerDate.tossWinner === match?.teams?.requestingTeam?.userId) {
      setWinnerDate({
        ...winnerDate,
        tossLooser: match?.teams?.requestedTeam?.userId,
      });
    }

    if (winnerDate.tossWinner === match?.teams?.requestedTeam?.userId) {
      setWinnerDate({
        ...winnerDate,
        tossLooser: match?.teams?.requestingTeam?.userId,
      });
    }
  }, [winnerDate.tossWinner]);

  return (
    <div className="bg-natural-white p-10 w-[40%] fixed top-[8%] left-[36%] m-auto rounded-md shadow-lg ">
      <h2 className="text-center text-3xl font-bold text-primary-darkNavy">
        Select Toss Winner
      </h2>

      <span className="border-b border-primary-brightOrange w-full block py-2"></span>
      <span className="text-center my-2 font-semibold capitalize text-accentColor-skyBlur block">
        {match?.teams.requestingTeam?.name} VS{" "}
        {match?.teams.requestedTeam?.name}{" "}
      </span>
      <div className="flex flex-col gap-5 mt-5 ">
        <div>
          <label
            className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 "
            htmlFor="over"
          >
            How Many Overs Want's To Play?
          </label>
          <select
            onChange={(e) =>
              setWinnerDate({ ...winnerDate, over: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur"
            name="over"
            id="over"
          >
            <option>Select Over</option>
            {optionValues()?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
            Who Won The Toss?
          </span>
          <div className="flex flex-row justify-between">
            <h2
              className={`border shadow  p-5 rounded-md cursor-pointer capitalize ${
                match?.teams?.requestingTeam?.userId ===
                  winnerDate.tossWinner && "border-primary-brightOrange"
              }
       `}
              onClick={() => handelWinner(match?.teams?.requestingTeam?.userId)}
            >
              {match?.teams?.requestingTeam?.name}
            </h2>

            <h2
              className={`border shadow  p-5 rounded-md cursor-pointer capitalize ${
                match?.teams?.requestedTeam?.userId === winnerDate.tossWinner &&
                "border-primary-brightOrange"
              } `}
              onClick={() => handelWinner(match?.teams?.requestedTeam?.userId)}
            >
              {match?.teams?.requestedTeam?.name}
            </h2>
          </div>
        </div>

        <div>
          <span className=" text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
            Total 11 players are playing right? if not select total player
          </span>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur"
            type="number"
            onChange={(e) =>
              setWinnerDate({ ...winnerDate, totalWickets: e.target.value })
            }
          />
        </div>

        <span onClick={handelSubmit}>
          <SecondaryButton text={"Submit"} classes={"w-full"} />
        </span>
      </div>
      <span
        className="absolute top-5 cursor-pointer right-5 "
        onClick={() => setNextPage(false)}
      >
        <IoMdClose />
      </span>
    </div>
  );
};

export default TosWinnerOverWickets;

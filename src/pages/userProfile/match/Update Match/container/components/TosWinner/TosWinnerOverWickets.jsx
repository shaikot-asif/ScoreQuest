import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { optionValues } from "../../../../../../../utils/optionValues";

import toast from "react-hot-toast";
import {
  getMatchByMatchId,
  updateOverAndTossWinner,
} from "../../../../../../../service/match";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TosWinnerOverWicketsCard from "./container/components/TosWinnerOverWicketsCard";

const INIT = {
  over: 0,
  tossWinner: "",
  tossLooser: "",
  totalWickets: 11,
};

const TosWinnerOverWickets = () => {
  const userState = useSelector((state) => state.user);
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [winnerDate, setWinnerDate] = useState({ ...INIT });

  const { data: match, isLoading } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByMatchId({
        matchId: matchId,
        token: userState.userInfo.token,
      }),
  });

  const handelWinner = (data) => {
    setWinnerDate((prev) => ({ ...prev, tossWinner: data }));
  };

  const { mutate, isPending } = useMutation({
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
    onSuccess: (data) => {
      toast.success("Update Successfully");

      navigate(`/profile/match/innings/${matchId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (match?.toss?.tossWinner) {
      navigate(`/profile/match/innings/:${matchId}`);
    }
  }, [match]);

  const handelSubmit = () => {
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
    <TosWinnerOverWicketsCard
      handelSubmit={handelSubmit}
      handelWinner={handelWinner}
      isLoading={isLoading}
      match={match}
      optionValues={optionValues}
      setWinnerDate={setWinnerDate}
      winnerDate={winnerDate}
    />
  );
};

export default TosWinnerOverWickets;

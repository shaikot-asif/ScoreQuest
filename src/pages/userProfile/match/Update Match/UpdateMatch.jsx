import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { getMatchByMatchId } from "../../../../service/match";
import { useSelector } from "react-redux";
import StartMatchTImeCount from "./container/components/StartMatchTimeCount/StartMatchTImeCount";
import Loading from "../../../../components/shared/Loading/Loading";
import TosWinnerOverWickets from "./container/components/TosWinner/TosWinnerOverWickets";
import SelectInningsType from "./container/components/SelectInningsType/SelectInningsType";
import UpdateMatchBallByBall from "./container/updateMatch/UpdateMatchBallByBall";
import { toast } from "react-hot-toast";

const UpdateMatch = () => {
  const { matchId } = useParams();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    data: match,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByMatchId({
        matchId: matchId,
        token: userState.userInfo.token,
      }),
  });

  useEffect(() => {
    console.log("from useEffect");

    if (
      match?.battingUser?.toString() !== userState?.userInfo?.id &&
      userState?.userInfo?.id === match?.bowlingUser?.toString()
    ) {
      navigate("/todayMatch");
    }

    console.log(
      match?.battingUser?.toString() === userState?.userInfo?.id,
      userState?.userInfo?.id !== match?.bowlingUser?.toString()
    );

    if (
      match?.battingUser?.toString() === userState?.userInfo?.id &&
      userState?.userInfo?.id !== match?.bowlingUser?.toString()
    ) {
      navigate(`/profile/match/${matchId}`);
    }

    if (
      userState?.userInfo?.id === match?.toss?.tossWinner?.toString() &&
      !match?.toss?.inningsType
    ) {
      navigate(`/profile/match/innings/:${matchId}`);
    }
  }, [match?.battingUser, match?.bowlingUser]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {!match?.toss?.tossWinner && <StartMatchTImeCount match={match} />}

          {/* {nextPage && (
            <TosWinnerOverWickets match={match} setNextPage={setNextPage} />
          )} */}

          {/* {userState.userInfo.id === match?.toss?.tossWinner &&
            !match?.battingUser?.userId &&
            !match?.bowlingUser?.userId && <SelectInningsType match={match} />} */}

          {/* {match?.battingUser?.userId?.toString() ===
            userState?.userInfo?.id?.toString() &&
          match?.status === "accepted" ? (
            <UpdateMatchBallByBall match={match} /> */}
        </div>
      )}
    </div>
  );
};

export default UpdateMatch;

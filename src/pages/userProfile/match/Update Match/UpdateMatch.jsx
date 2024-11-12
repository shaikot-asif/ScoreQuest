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
  const [match, setMatch] = useState();
  const [nextPage, setNextPage] = useState(false);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByMatchId({
        matchId: matchId,
        token: userState.userInfo.id,
      }),
  });

  useEffect(() => {
    if (data) {
      setMatch(data);
    } else {
      refetch();
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <StartMatchTImeCount
            nextPage={nextPage}
            setNextPage={setNextPage}
            match={match}
          />

          {nextPage && (
            <TosWinnerOverWickets match={match} setNextPage={setNextPage} />
          )}

          {userState.userInfo.id === match?.toss?.tossWinner &&
            !match?.battingUser?.userId &&
            !match?.bowlingUser?.userId && <SelectInningsType match={match} />}

          {match?.battingUser?.userId?.toString() ===
          userState?.userInfo?.id?.toString() ? (
            <UpdateMatchBallByBall match={match} />
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateMatch;

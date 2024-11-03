import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getMatchByMatchId } from "../../../../service/match";
import { useSelector } from "react-redux";
import StartMatchTImeCount from "./container/components/StartMatchTimeCount/StartMatchTImeCount";
import Loading from "../../../../components/shared/Loading/Loading";
import TosWinnerOverWickets from "./container/components/TosWinner/TosWinnerOverWickets";

const UpdateMatch = () => {
  const { matchId } = useParams();
  const userState = useSelector((state) => state.user);
  const [match, setMatch] = useState();
  const [nextPage, setNextPage] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["match"],
    queryFn: useCallback(() =>
      getMatchByMatchId({ matchId: matchId, token: userState.userInfo.id })
    ),
  });

  useEffect(() => {
    if (data) {
      setMatch(data);
    } else refetch();
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <StartMatchTImeCount
          nextPage={nextPage}
          setNextPage={setNextPage}
          match={match}
        />
      )}

      {nextPage && (
        <TosWinnerOverWickets match={match} setNextPage={setNextPage} />
      )}
    </div>
  );
};

export default UpdateMatch;

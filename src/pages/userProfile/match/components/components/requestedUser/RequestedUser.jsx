import React from "react";
import MatchCard from "../MatchCard";
import { useQuery } from "@tanstack/react-query";
import { getMatchByRequestedTeamId } from "../../../../../../service/match";
import { useSelector } from "react-redux";
import Loading from "../../../../../../components/shared/Loading/Loading";

const RequestedUser = () => {
  const userState = useSelector((state) => state.user);

  const { data, isLoadin } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByRequestedTeamId({
        RequestedTeamId: userState.userInfo.id,
        token: userState.userInfo.token,
      }),
  });
  return (
    <div>
      {isLoadin ? (
        <Loading />
      ) : (
        data?.map((item) => <MatchCard item={item} key={item._key} />)
      )}
    </div>
  );
};

export default RequestedUser;

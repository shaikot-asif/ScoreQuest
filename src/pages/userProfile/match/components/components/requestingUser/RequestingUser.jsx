import { useQuery, useMutation } from "@tanstack/react-query";
import { getMatchByRequestingTeamId } from "../../../../../../service/match";
import { useSelector } from "react-redux";
import MatchCard from "../MatchCard";
import Loading from "../../../../../../components/shared/Loading/Loading";
import { useState } from "react";

const RequestingUser = () => {
  const userState = useSelector((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["match", userState.userInfo.id],
    queryFn: () =>
      getMatchByRequestingTeamId({
        token: userState.userInfo.token,
        RequestingTeamId: userState.userInfo.id,
      }),
  });

  return (
    <div className="mt-10 flex flex-row justify-evenly">
      {data?.length === 0 ? (
        <h3 className="text-primary-brightOrange text-xl ">
          There is no match found
        </h3>
      ) : !isLoading ? (
        data?.map((item) => <MatchCard item={item} key={item._id} />)
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default RequestingUser;

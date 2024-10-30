import { useQuery } from "@tanstack/react-query";
import { getMatchByRequestingTeamId } from "../../../../../../service/match";
import { useSelector } from "react-redux";
import MatchCard from "../MatchCard";

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
    <div>
      Requesting User
      <MatchCard data={data} />
    </div>
  );
};

export default RequestingUser;

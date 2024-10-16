import { getUser } from "../service/user";

export const useFetchUserNames = async (
  matchData,
  userState,
  isRequesting = true
) => {
  const userIds = new Set();
  isRequesting
    ? matchData?.forEach((match) => {
        userIds.add(match.teams.requestedTeam.userId);
      })
    : matchData?.forEach((match) => {
        userIds.add(match.teams.requestingTeam.userId);
      });

  const namePromises = Array.from(userIds).map((userId) =>
    getUser({ userId, token: userState.userInfo.token }).then((data) => ({
      userId,
      name: data.name,
    }))
  );

  const names = await Promise.all(namePromises);
  const nameMap = {};
  names.forEach(({ userId, name }) => {
    nameMap[userId] = name;
  });

  return nameMap;
};

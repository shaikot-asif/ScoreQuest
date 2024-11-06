import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSquadById } from "../../../../../../service/squad";
import { getPlayer } from "../../../../../../service/player";

const INIT_SELECT_PLAYER = {
  batter1: "",
  batter2: "",
  bowler: "",
};

const UpdateMatchBallByBall = ({ match }) => {
  const userState = useSelector((state) => state.user);
  const [selectedPlayer, setSelectedPlayer] = useState({
    ...INIT_SELECT_PLAYER,
  });

  const [requestedPlayers, setRequestedPlayers] = useState([]);
  const [requestingPlayers, setRequestingPlayers] = useState([]);

  const [requestedSquad, setRequestedSquad] = useState(null);
  const [requestingSquad, setRequestingSquad] = useState(null);

  const {
    data: requestingSquadData,
    isLoading: requestingLoading,
    error: requestingError,
    refetch: requestingRefetch,
  } = useQuery({
    queryKey: ["requestingSquad"],
    queryFn: () =>
      getSquadById({
        squadId: match?.squads?.requestingTeamSquad?.squadId,
        token: userState?.userInfo?.token,
      }),
  });

  useEffect(() => {
    if (requestingSquadData) {
      setRequestingSquad(requestingSquadData);
    } else requestingRefetch();
  }, [requestingSquadData]);

  const {
    data: requestedSquadData,
    isLoading: requestedLoading,
    error: requestedError,
    refetch: requestedRefetch,
  } = useQuery({
    queryKey: ["requestedSquad"],
    queryFn: () =>
      getSquadById({
        squadId: match?.squads?.requestedTeamSquad?.squadId,
        token: userState?.userInfo?.token,
      }),
  });

  useEffect(() => {
    if (requestedSquadData) {
      setRequestedSquad(requestedSquadData);
    } else requestedRefetch();
  }, [requestedSquadData]);

  console.log(requestedSquad, requestingSquad);

  const {
    data: requestedPlayer,
    isLoading: requestedPlayerLoading,
    error: requestedPlayerError,
    refetch: requestedPlayerRefetch,
  } = useQuery({
    queryKey: ["player"],
    queryFn: async () => {
      const players = await Promise.all(
        requestedSquad[0]?.selectedPlayer?.map((item) => {
          return getPlayer({
            playerId: item,
            token: userState?.userInfo?.token,
          });
        })
      );

      return players;
    },
  });

  useEffect(() => {
    if (requestedPlayer) {
      setRequestedPlayers(requestedPlayer);
    } else requestedPlayerRefetch();
  }, [requestedPlayer]);

  const {
    data: requestingPlayer,
    isLoading: requestingPlayerLoading,
    error: requestingPlayerError,
    refetch: requestingPlayerRefetch,
  } = useQuery({
    queryKey: ["player"],
    queryFn: async () => {
      const players = await Promise.all(
        requestingSquad[0]?.selectedPlayer?.map((item) => {
          return getPlayer({
            playerId: item,
            token: userState?.userInfo?.token,
          });
        })
      );

      return players;
    },
  });
  useEffect(() => {
    if (requestingPlayer) {
      setRequestingPlayers(requestedPlayer);
    } else requestingPlayerRefetch();
  }, [requestingPlayer]);
  console.log(requestedPlayer, requestingPlayer, "requestedPlayer");

  return (
    <div>
      <div className=" shadow-lg p-6 mx-auto rounded-lg">
        <h2 className="text-2xl font-bold text-center  text-primary-darkNavy">
          Update Scores
        </h2>
        <span className="border-b border-primary-brightOrange mb-5 w-full block py-2"></span>

        <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
          {match?.teams?.requestingTeam?.name || "unknown"} VS{" "}
          {match?.teams?.requestedTeam?.name || "unknown"}
        </h3>

        <div className="bg-secondary-coolGray p-5 w-[35%] m-auto shadow-lg rounded-lg ">
          <div className="flex flex-row gap-2  text-xl justify-center font-semibold text-primary-brightOrange mb-2">
            <span>Batting: </span>{" "}
            {match?.battingUser?.userId?.toString() ===
            match?.teams?.requestingTeam?.userId.toString() ? (
              <h3 className="">{match?.teams?.requestingTeam?.name}</h3>
            ) : (
              <h3 className="">{match?.teams?.requestedTeam?.name}</h3>
            )}
          </div>

          <div>
            {match?.battingUser?.userId.toString() ===
            match?.teams?.requestingTeam?.userId.toString() ? (
              <div className="flex flex-row justify-evenly ">
                <span>
                  Runs: {match?.score?.requestingTeam.totalRuns} /{" "}
                  {match?.score?.requestingTeam.totalWickets}{" "}
                </span>
                <span>
                  Overs: {match?.score?.requestingTeam.totalOvers / 6}.
                  {match?.score?.requestingTeam.totalOvers % 6}
                </span>
              </div>
            ) : (
              <div className="flex flex-row justify-evenly ">
                <span>
                  Runs: {match?.score?.requestedTeam.totalRuns} /{" "}
                  {match?.score?.requestedTeam.totalWickets}{" "}
                </span>
                <span>
                  Overs: {match?.score?.requestedTeam.totalOvers / 6}.
                  {match?.score?.requestedTeam.totalOvers % 6}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Batting Players Selection */}
        <div className="mb-4">
          <h4 className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
            Select Batter
          </h4>

          <div className="flex flex-row gap-5">
            <button className="w-full py-4 border  rounded-md focus:ring-2 focus:ring-primary-brightOrange ">
              Select player
            </button>
            <button className="w-full py-4 border  rounded-md focus:ring-2 focus:ring-primary-brightOrange ">
              Select player
            </button>
          </div>
        </div>

        {/* Bowling Player Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Bowler
          </label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select Bowler</option>
            <option>Bowler 1</option>
            <option>Bowler 2</option>
          </select>
        </div>

        {/* Per Ball Occurs Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button className="py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Dot Ball
          </button>
          <button className="py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            1 Run
          </button>
          <button className="py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
            2 Runs
          </button>
          <button className="py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
            3 Runs
          </button>
          <button className="py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            4 Runs
          </button>
          <button className="py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            6 Runs
          </button>
          <button className="py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Wide
          </button>
          <button className="py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800">
            No Ball
          </button>
          <button className="py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Wicket
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMatchBallByBall;

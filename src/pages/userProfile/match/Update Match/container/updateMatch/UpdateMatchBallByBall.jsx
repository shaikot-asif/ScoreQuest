import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSquadById } from "../../../../../../service/squad";
import { getPlayer } from "../../../../../../service/player";
import PlayersList from "./components/PlayersList";
import { IoMdClose } from "react-icons/io";

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
  const [selectBatter1, setSelectBatter1] = useState(false);
  const [selectBatter2, setSelectBatter2] = useState(false);
  const [selectBowling, setSelectBowling] = useState(false);

  const [battingTeamKey, setBattingTeamKey] = useState("");
  const [bowlingTeamKey, setBowlingTeamKey] = useState("");

  const [requestedPlayers, setRequestedPlayers] = useState([]);
  const [requestingPlayers, setRequestingPlayers] = useState([]);

  const [requestedSquad, setRequestedSquad] = useState(null);
  const [requestingSquad, setRequestingSquad] = useState(null);

  useEffect(() => {
    let battingTeam =
      match?.battingUser?.userId?.toString() ===
      match?.teams?.requestingTeam?.userId.toString()
        ? "requestingTeam"
        : "requestedTeam";
    let bowlingTeamKey =
      battingTeam === "requestedTeam" ? "requestingTeam" : "requestedTeam";

    setBattingTeamKey(battingTeam);
    setBowlingTeamKey(bowlingTeamKey);
  }, [match]);

  const handleBatter1Id = (data) => {
    if (selectBatter1) {
      console.log(data, "for batter 1");
    }
    if (selectBatter2) {
      console.log(data, "for batter 2");
    }
  };

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

  return (
    <div className="relative">
      <div className=" shadow-lg p-6 mx-auto rounded-lg">
        <div className="flex flex-row justify-between items-center ">
          <div
            className={`${
              battingTeamKey === "requestingTeam" &&
              "border border-primary-brightOrange"
            } p-5  shadow-lg rounded-lg`}
          >
            <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
              {match?.teams?.requestingTeam?.name || "unknown"}
            </h3>

            <div className="flex flex-row gap-2 justify-evenly ">
              <span>
                Runs: {match?.score?.requestingTeam.totalRuns} /{" "}
                {match?.score?.requestingTeam.totalWickets}{" "}
              </span>
              <span>
                Overs: {match?.score?.requestingTeam.totalOvers / 6}.
                {match?.score?.requestingTeam.totalOvers % 6}
              </span>
            </div>
          </div>
          <span className="bg-secondary-coolGray p-5  shadow-lg rounded-lg">
            VS
          </span>
          <div
            className={`${
              battingTeamKey === "requestedTeam" &&
              "border border-primary-brightOrange"
            } p-5  shadow-lg rounded-lg`}
          >
            <h3 className="text-xl font-semibold text-primary-brightOrange text-center mb-2 cursor-pointer">
              {match?.teams?.requestedTeam?.name || "unknown"}
            </h3>

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
          </div>
        </div>

        <span className="border-b border-primary-brightOrange mb-5 w-full block py-2"></span>

        {/* Batting Players Selection */}
        <div className="mb-4">
          <h4 className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
            Select Batter
          </h4>

          <div className="flex flex-row gap-5">
            {selectedPlayer.batter1 === INIT_SELECT_PLAYER.batter1 && (
              <button
                onClick={() => setSelectBatter1(true)}
                className="w-full py-4 border hover:border-primary-brightOrange capitalize shadow rounded-md focus:ring-2 focus:ring-primary-brightOrange "
              >
                Click here to Select player 1
              </button>
            )}

            {selectedPlayer.batter2 === INIT_SELECT_PLAYER.batter2 && (
              <button
                onClick={() => setSelectBatter2(true)}
                className="w-full py-4 border  hover:border-primary-brightOrange capitalize shadow rounded-md focus:ring-2 focus:ring-primary-brightOrange "
              >
                Click here to Select player 2
              </button>
            )}
          </div>
        </div>

        {/* Bowling Player Selection */}
        <div className="mb-4">
          <h4 className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
            Select Bowler
          </h4>

          <div className="flex flex-row gap-5">
            {selectedPlayer.bowler === INIT_SELECT_PLAYER.bowler && (
              <button className="w-1/2 py-4 border capitalize shadow rounded-md focus:ring-2 focus:ring-primary-brightOrange ">
                Click here to Select player 1
              </button>
            )}
          </div>
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

      {(selectBatter1 || selectBatter2) && (
        <div className="absolute top-0 bottom-0 left-0 w-full backdrop-blur-sm">
          <div className="shadow-lg p-6 rounded-lg fixed h-[500px] overflow-y-auto w-[90%] left-[5%] top-[5%] bg-secondary-coolGray">
            <PlayersList
              players={requestingPlayers}
              title={"Select Player"}
              isSelectPlayer={false}
              classes={"cursor-pointer"}
              handleBatter1Id={handleBatter1Id}
              setSelectBatter1={setSelectBatter1}
              setSelectBatter2={setSelectBatter2}
            />

            <span
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => {
                setSelectBatter1(false);
                setSelectBatter2(false);
              }}
            >
              <IoMdClose />
            </span>
          </div>
        </div>
      )}

      {selectBowling && (
        <div className="absolute top-0 bottom-0 left-0 w-full backdrop-blur-sm">
          <div className="shadow-lg p-6 rounded-lg fixed h-[500px] overflow-y-auto w-[90%] left-[5%] top-[5%] bg-secondary-coolGray">
            <PlayersList
              players={requestingPlayers}
              title={"Select Player"}
              isSelectPlayer={false}
              classes={"cursor-pointer"}
              handleBatter1Id={handleBatter1Id}
              setSelectBatter1={setSelectBatter1}
              setSelectBatter2={setSelectBatter2}
            />

            <span
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => {
                setSelectBatter1(false);
                setSelectBatter2(false);
              }}
            >
              <IoMdClose />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateMatchBallByBall;

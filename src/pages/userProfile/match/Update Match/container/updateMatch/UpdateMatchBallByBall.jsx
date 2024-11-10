import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSquadById } from "../../../../../../service/squad";
import { getPlayer } from "../../../../../../service/player";
import PlayersList from "./components/PlayersList";
import { IoMdClose } from "react-icons/io";
import images from "../../../../../../constants/images";
import stables from "../../../../../../constants/stable";
import UpdateScoreButton from "../../../../../../components/shared/button/UpdateScoreButton";

const runs = [0, 1, 2, 3, 4, 5, 6];

const INIT_SELECT_PLAYER = {
  batter1: {
    id: "",
    fName: "",
    lName: "",
    avatar: "",
  },
  batter2: {
    id: "",
    fName: "",
    lName: "",
    avatar: "",
  },
  bowler: {
    id: "",
    fName: "",
    lName: "",
    avatar: "",
  },
};

const INIT_PER_BALL_OCCURS = {
  ballOccurs: "",
  wideBye: 0,
  batterScore: 0,
  byeScore: "",
};

const UpdateMatchBallByBall = ({ match }) => {
  const userState = useSelector((state) => state.user);

  const [selectedPlayer, setSelectedPlayer] = useState(
    localStorage.getItem("playerInfo")
      ? JSON.parse(localStorage.getItem("playerInfo"))
      : { ...INIT_SELECT_PLAYER }
  );

  const [selectedBatterId, setSelectedBatterId] = useState("");
  const [selectedBowlerId, setSelectedBowlerId] = useState("");

  const [perBallOccurs, setPerBallOccurs] = useState({
    ...INIT_PER_BALL_OCCURS,
  });
  const [overCount, setOverCount] = useState(
    localStorage.getItem("overCount")
      ? JSON.parse(localStorage.getItem("overCount"))
      : 0
  );
  const [selectBatter1, setSelectBatter1] = useState(false);
  const [selectBatter2, setSelectBatter2] = useState(false);
  const [selectBowling, setSelectBowling] = useState(false);

  const [battingTeamKey, setBattingTeamKey] = useState("");
  const [bowlingTeamKey, setBowlingTeamKey] = useState("");

  const [battingPlayer, setBattingPlayer] = useState();
  const [bowlingPlayer, setBowlingPlayer] = useState();

  //TODO: WILL BE ADD SOMETHING AFTER REALTIME CONNECTION LIKE:
  //TODO:

  console.log(selectedPlayer);

  console.log(match, "match");

  console.log(
    selectedBatterId,
    "selectedBatterId",
    selectedBowlerId,
    "selectedBowlerId"
  );

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

  const handleSelectedPlayer = (data) => {
    if (selectBatter1) {
      if (data.id === selectedPlayer.batter2.id) {
        window.alert("Already select this player please try another player");
      } else {
        setSelectedPlayer({
          ...selectedPlayer,
          batter1: {
            id: data.id,
            fName: data.fName,
            lName: data.lName,
            avatar: data.avatar,
          },
        });
      }
    }
    if (selectBatter2) {
      if (selectedPlayer.batter1.id === data.id) {
        window.alert("Already select this player please try another player");
      } else {
        setSelectedPlayer({
          ...selectedPlayer,
          batter2: {
            id: data.id,
            fName: data.fName,
            lName: data.lName,
            avatar: data.avatar,
          },
        });
      }
    }
  };

  const handleSelectedBowler = (data) => {
    setSelectedPlayer({
      ...selectedPlayer,
      bowler: {
        id: data.id,
        fName: data.fName,
        lName: data.lName,
        avatar: data.avatar,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem("playerInfo", JSON.stringify(selectedPlayer));
    setSelectedBowlerId(selectedPlayer?.bowler?.id);
  }, [selectedPlayer]);

  const {
    data: requestingSquad,
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

  const {
    data: requestedSquad,
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

  const {
    data: requestedPlayers,
    isLoading: requestedPlayerLoading,
    error: requestedPlayerError,
    refetch: requestedPlayerRefetch,
  } = useQuery({
    queryKey: ["requestedPlayer"],
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

  const {
    data: requestingPlayers,
    isLoading: requestingPlayerLoading,
    error: requestingPlayerError,
    refetch: requestingPlayerRefetch,
  } = useQuery({
    queryKey: ["requestingPlayer"],
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

  const handelRunOccurs = (data) => {
    setPerBallOccurs({
      ...perBallOccurs,
      ballOccurs: data,
    });
    localStorage.setItem("overCount", JSON.stringify(overCount + 1));
    setOverCount(JSON.parse(localStorage.getItem("overCount")));
  };

  useEffect(() => {
    if (overCount === 6) {
      localStorage.setItem("overCount", JSON.parse(0));
      setOverCount(JSON.parse(localStorage.getItem("overCount")));
    }
  }, [overCount]);

  console.log(overCount, "overCount");

  console.log(perBallOccurs, "perBallOccurs");

  useEffect(() => {
    if (requestedPlayers && requestingPlayers) {
      if (
        battingTeamKey === "requestedTeam" &&
        bowlingTeamKey === "requestingTeam"
      ) {
        setBattingPlayer(requestedPlayers);
        setBowlingPlayer(requestingPlayers);
      }
      if (
        battingTeamKey === "requestingTeam" &&
        bowlingTeamKey === "requestedTeam"
      ) {
        setBattingPlayer(requestingPlayers);
        setBowlingPlayer(requestedPlayers);
      }
    }
  }, [requestedPlayers, requestingPlayers, bowlingTeamKey, battingTeamKey]);

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
            {selectedPlayer?.batter1?.id === INIT_SELECT_PLAYER.batter1.id ? (
              <button
                onClick={() => setSelectBatter1(true)}
                className="w-full py-4 border hover:border-primary-brightOrange capitalize shadow rounded-md focus:ring-2 focus:ring-primary-brightOrange "
              >
                Click here to Select first player
              </button>
            ) : (
              <div
                onClick={() => setSelectedBatterId(selectedPlayer?.batter1?.id)}
                className={`${
                  selectedBatterId === selectedPlayer?.batter1?.id &&
                  "bg-primary-brightOrange rounded-md text-natural-white"
                } flex w-full flex-row cursor-pointer justify-between rounded-md gap-5 items-center shadow p-2 mb-5`}
              >
                <div className="flex w-full flex-row items-center cursor-pointer gap-5">
                  <img
                    className="rounded-full"
                    height={50}
                    width={50}
                    src={
                      selectedPlayer?.batter1?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL +
                          selectedPlayer?.batter1?.avatar
                        : images.Profile
                    }
                    alt="img"
                  />
                  <h3
                    className={`font-bold text-xl ${
                      selectedBatterId === selectedPlayer?.batter1?.id
                        ? "text-natural-white"
                        : "text-primary-brightOrange"
                    } `}
                  >
                    {selectedPlayer?.batter1?.fName}{" "}
                    {selectedPlayer?.batter1?.lName}{" "}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <span>{0}</span> / <span>0</span>
                </div>

                <div>
                  <span
                    className="hover:underline"
                    onClick={() => setSelectBatter1(true)}
                  >
                    Change
                  </span>
                </div>
              </div>
            )}

            {selectedPlayer?.batter2?.id === INIT_SELECT_PLAYER?.batter2?.id ? (
              <button
                onClick={() => setSelectBatter2(true)}
                className="w-full py-4 border  hover:border-primary-brightOrange capitalize shadow rounded-md focus:ring-2 focus:ring-primary-brightOrange "
              >
                Click here to Select 2nd player
              </button>
            ) : (
              <div
                onClick={() => setSelectedBatterId(selectedPlayer?.batter2?.id)}
                className={`${
                  selectedBatterId === selectedPlayer?.batter2?.id &&
                  "bg-primary-brightOrange rounded-md text-natural-white"
                } flex w-full flex-row cursor-pointer justify-between rounded-md gap-5 items-center shadow p-2 mb-5`}
              >
                <div className="flex w-full flex-row items-center cursor-pointer gap-5">
                  <img
                    className="rounded-full"
                    height={50}
                    width={50}
                    src={
                      selectedPlayer?.batter2?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL +
                          selectedPlayer?.batter2?.avatar
                        : images.Profile
                    }
                    alt="img"
                  />
                  <h3
                    className={`font-bold text-xl ${
                      selectedBatterId === selectedPlayer?.batter2?.id
                        ? "text-natural-white"
                        : "text-primary-brightOrange"
                    } `}
                  >
                    {selectedPlayer?.batter2?.fName}{" "}
                    {selectedPlayer?.batter2?.lName}{" "}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <span>{0}</span> / <span>0</span>
                </div>
                <div>
                  <span
                    className="hover:underline"
                    onClick={() => setSelectBatter2(true)}
                  >
                    Change
                  </span>
                </div>
              </div>
            )}
          </div>

          {!selectedBatterId &&
            selectedPlayer?.batter1?.id &&
            selectedPlayer?.batter2?.id && (
              <p className="text-primary-brightOrange font-semibold ">
                Please click a player who on the strick
              </p>
            )}
        </div>

        {/* Bowling Player Selection */}
        <div className="mb-4">
          <h4 className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
            Select Bowler
          </h4>

          <div className="flex flex-row gap-5">
            {selectedPlayer?.bowler?.id === INIT_SELECT_PLAYER.bowler.id ? (
              <button
                onClick={() => setSelectBowling(true)}
                className="w-1/2 py-4 border capitalize shadow rounded-md focus:ring-2 focus:ring-primary-brightOrange "
              >
                Click here to Select player 1
              </button>
            ) : (
              <div
                className={`${
                  selectedBowlerId === selectedPlayer?.bowler?.id &&
                  "bg-primary-brightOrange rounded-md text-natural-white"
                } flex w-[50%] cursor-pointer justify-between flex-row gap-5 items-center shadow p-2 mb-5`}
              >
                <div className="flex w-full flex-row items-center cursor-pointer gap-5">
                  <img
                    className="rounded-full"
                    height={50}
                    width={50}
                    src={
                      selectedPlayer?.bowler?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL +
                          selectedPlayer.bowler.avatar
                        : images.Profile
                    }
                    alt="img"
                  />

                  <h3
                    className={`font-bold text-xl ${
                      selectedBowlerId === selectedPlayer?.bowler?.id
                        ? "text-natural-white"
                        : "text-primary-brightOrange"
                    }`}
                  >
                    {selectedPlayer?.bowler?.fName}{" "}
                    {selectedPlayer?.bowler?.lName}{" "}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <span>{0}</span> / <span>0</span>
                </div>

                <div>
                  <span
                    className="hover:underline"
                    onClick={() => setSelectBowling(true)}
                  >
                    Change
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Per Ball Occurs Buttons */}
        <div className="flex flex-col gap-10">
          <div className="flex gap-5 items-center">
            <h3 className="text-xl font-semibold text-primary-brightOrange mb-2">
              Runs:
            </h3>
            <div className="flex gap-5">
              {runs.map((item, index) => (
                <span key={index} onClick={() => handelRunOccurs(item)}>
                  <UpdateScoreButton title={item} key={index} />
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-5">
            <h3 className="text-xl font-semibold text-primary-brightOrange mb-2">
              Extras:
            </h3>

            <div className="flex gap-5">
              <UpdateScoreButton title={"Wide ball"} classes={"w-[80px]"} />
              <UpdateScoreButton title={"No ball"} classes={"w-[80px]"} />
              <UpdateScoreButton title={"Leg Bye"} classes={"w-[80px]"} />
              <UpdateScoreButton title={"Bye"} classes={"w-[80px]"} />
            </div>
          </div>
          <div className="flex gap-5">
            <h3 className="text-xl font-semibold text-primary-brightOrange mb-2">
              Wickets:
            </h3>

            <div className="flex gap-5">
              <UpdateScoreButton title={"Bowled"} classes={"w-[80px]"} />
              <UpdateScoreButton title={"Caught"} classes={"w-[80px]"} />
              <UpdateScoreButton title={"LBW"} classes={"w-[80px]"} />
              <UpdateScoreButton title={"Run out"} classes={"w-[80px]"} />
              <UpdateScoreButton title={"Stumped"} classes={"w-[80px]"} />
            </div>
          </div>
        </div>
      </div>

      {(selectBatter1 || selectBatter2) && (
        <div className="absolute top-0 bottom-0 left-0 w-full backdrop-blur-sm">
          <div className="shadow-lg p-6 rounded-lg fixed h-[500px] overflow-y-auto w-[90%] left-[5%] top-[5%] bg-secondary-coolGray">
            <PlayersList
              players={battingPlayer}
              title={"Select Batting Player"}
              isSelectPlayer={false}
              classes={"cursor-pointer"}
              handleSelectedPlayer={handleSelectedPlayer}
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
              players={bowlingPlayer}
              title={"Select Bowling Player"}
              isSelectPlayer={false}
              classes={"cursor-pointer"}
              handleSelectedPlayer={handleSelectedBowler}
              setSelectBatter1={setSelectBowling}
            />

            <span
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => {
                setSelectBowling(false);
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

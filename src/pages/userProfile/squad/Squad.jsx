import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPlayer, getPlayers } from "../../../service/player";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import {
  addSquad,
  deleteSquad,
  getSquad,
  getSquadById,
} from "../../../service/squad";
import Loading from "../../../components/shared/Loading/Loading";
import SquadCard from "./container/components/SquadCard";

const Squad = () => {
  const [players, setPlayers] = useState([]);
  const [checkChecked, setCheckChecked] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [oneSquad, setOneSquad] = useState([]);
  const [playersFromSquad, setPlayersBySquad] = useState([]);
  const [isSquadActive, setIsSquadActive] = useState(false);

  const userState = useSelector((state) => state.user);

  const { mutate } = useMutation({
    mutationKey: ["squad"],
    mutationFn: ({ selectedPlayer }) => {
      return addSquad({
        userId: userState.userInfo.id,
        token: userState.userInfo.token,
        selectedPlayer,
      });
    },
    onSuccess: () => {
      toast.success("squad added successfully");
      squadRefetch();
      setIsActive(false);
    },
    onError: (error) => {
      toast.error("only 3 squad you can added");
    },
  });

  const handleChange = (e) => {
    if (e.target.checked) {
      setCheckChecked([...checkChecked, e.target.value]);
    } else {
      setCheckChecked([
        ...checkChecked.filter((item) => item !== e.target.value),
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkChecked.length > 0) {
      mutate({ selectedPlayer: checkChecked });
      squadRefetch();
      setCheckChecked([]);
    } else {
      toast.error("Please Select Player");
    }
  };

  const { mutate: deleteSquadMutate } = useMutation({
    mutationFn: ({ squadId }) =>
      deleteSquad({
        token: userState.userInfo.token,
        squadId,
      }),
    mutationKey: ["squad"],
    onSuccess: (data) => {
      squadRefetch();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClick = async ({ squadId }) => {
    if (window.confirm("Are you sure delete this squad?")) {
      deleteSquadMutate({ squadId });
    }
  };

  const handleClickSingleSquad = async ({ _id }) => {
    const data = await getSquadById({
      squadId: _id,
      token: userState.userInfo.token,
    });

    setOneSquad(data[0].selectedPlayer);
    setIsSquadActive(true);
    setIsActive(false);
  };

  const closeSquad = () => {
    setIsSquadActive(false);
  };

  const {
    data,
    error,
    isLoading: playersLoading,
  } = useQuery({
    queryFn: useCallback(() => {
      return getPlayers({
        userId: userState.userInfo.id,
        token: userState.userInfo.token,
      });
    }, [userState]),
    queryKey: ["player", userState.userInfo.id],
  });

  if (error) {
    toast.error(error.message);
  }

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setPlayers(data);
      } else {
        setPlayers([data]);
      }
    }
  }, [data, players]);

  const {
    data: squadData,
    refetch: squadRefetch,
    isLoading: squadIsLoading,
  } = useQuery({
    queryFn: useCallback(() => {
      return getSquad({
        userId: userState?.userInfo?.id,
        token: userState.userInfo.token,
      });
    }, [userState.userInfo]),

    queryKey: ["squad"],
  });

  useEffect(() => {
    async function squadDataFunc() {
      const data = await Promise.all(
        oneSquad?.map((item) => {
          return getPlayer({ playerId: item, token: userState.userInfo.token });
        })
      );
      setPlayersBySquad([...data]);
    }

    squadDataFunc();
  }, [oneSquad, userState.userInfo]);

  return (
    <SquadCard
      closeSquad={closeSquad}
      handleChange={handleChange}
      handleClick={handleClick}
      handleClickSingleSquad={handleClickSingleSquad}
      handleSubmit={handleSubmit}
      isActive={isActive}
      isSquadActive={isSquadActive}
      players={players}
      playersFromSquad={playersFromSquad}
      playersLoading={playersLoading}
      setIsActive={setIsActive}
      setIsSquadActive={setIsSquadActive}
      squadData={squadData}
      squadIsLoading={squadIsLoading}
    />
  );
};

export default Squad;

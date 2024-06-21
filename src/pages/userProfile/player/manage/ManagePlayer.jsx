import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { deletePlayer, getPlayers } from "../../../../service/player";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import PlayerTable from "../components/PlayerTable";

const ManagePlayer = () => {
  const userState = useSelector((state) => state.user);
  const [deletePlayerId, setDeletePlayerId] = useState(null);

  const [players, setPlayers] = useState([]);

  const deletePlayerById = async ({ playerId }) => {
    if (window.confirm("are you sure to delete this player?")) {
      const data = deletePlayer({
        token: userState.userInfo.token,
        playerId,
      });

      setDeletePlayerId(await data);
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryFn: () =>
      getPlayers({
        userId: userState.userInfo._id,
        token: userState.userInfo.token,
      }),
    queryKey: ["player", userState.userInfo._id],
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setPlayers(data);
      } else {
        setPlayers([data]);
      }
    }
  }, [data, players]);

  useEffect(() => {
    if (deletePlayerId) {
      toast.success(deletePlayerId.message);
    }
    setDeletePlayerId(null);

    refetch();
  }, [deletePlayerId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <PlayerTable players={players} deletePlayerById={deletePlayerById} />
    </div>
  );
};

export default ManagePlayer;

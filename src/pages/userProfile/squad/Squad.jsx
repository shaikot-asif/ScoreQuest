import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlayer, getPlayers } from "../../../service/player";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import styled from "styled-components";

import PlayerTable from "../player/components/PlayerTable";
import {
  addSquad,
  deleteSquad,
  getSquad,
  getSquadById,
} from "../../../service/squad";

const Squad = () => {
  const [players, setPlayers] = useState([]);
  const [checkChecked, setCheckChecked] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [squadData, setSquadData] = useState(null);
  const [oneSquad, setOneSquad] = useState([]);
  const [playersFromSquad, setPlayersBySquad] = useState([]);
  const [isSquadActive, setIsSquadActive] = useState(false);

  const userState = useSelector((state) => state.user);

  const { mutate } = useMutation({
    mutationKey: ["squad"],
    mutationFn: ({ selectedPlayer }) => {
      return addSquad({
        userId: userState.userInfo._id,
        token: userState.userInfo.token,
        selectedPlayer,
      });
    },
    onSuccess: (data) => {
      toast.success("squad added successfully");
      squadRefetch();
      setIsActive(false);
    },
    onError: (error) => {
      console.log(error, "error");
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
    mutate({ selectedPlayer: checkChecked });
    squadRefetch();
    setCheckChecked([]);
  };

  const handleClick = async ({ squadId }) => {
    const data = await deleteSquad({
      token: userState.userInfo.token,
      squadId,
    });
    squadRefetch();
    toast.success(data.message);
  };

  const handleClickSingleSquad = async ({ _id }) => {
    const data = await getSquadById({ _id, token: userState.userInfo.token });
    setOneSquad(data.selectedPlayer);
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
    refetch,
  } = useQuery({
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

  const {
    data: squad,
    refetch: squadRefetch,
    isLoading: squadIsLoading,
  } = useQuery({
    queryFn: () =>
      getSquad({
        userId: userState.userInfo._id,
        token: userState.userInfo.token,
      }),
    queryKey: ["squad"],
  });

  useEffect(() => {
    if (squad) {
      setSquadData(squad);
    }
  }, [squad, squadRefetch]);

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
  }, [oneSquad]);

  return (
    <Container>
      <h2 className="title">Squad</h2>

      <div className="squadParent">
        {squadIsLoading ? (
          <p>Loading...</p>
        ) : (
          squadData?.map((item, index) => (
            <div key={item._id} className="squad">
              <h4 onClick={() => handleClickSingleSquad({ _id: item._id })}>
                squad {index + 1}
              </h4>
              <h6>total player {item.selectedPlayer.length} </h6>
              <button onClick={() => handleClick({ squadId: item._id })}>
                delete
              </button>
            </div>
          ))
        )}

        <div className="squadManage">
          {squadData?.length < 3 && (
            <div>
              <button
                className="addBtn"
                onClick={() => {
                  setIsActive(!isActive);
                  setIsSquadActive(false);
                }}
              >
                <span></span>
                <span></span>
              </button>
            </div>
          )}
        </div>
      </div>

      {isActive &&
        (playersLoading ? (
          <p>Loading...</p>
        ) : (
          <PlayerTable
            players={players}
            checkBox={true}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        ))}

      {isSquadActive && (
        <PlayerTable
          players={playersFromSquad}
          buttons={false}
          closeSquad={closeSquad}
        />
      )}
    </Container>
  );
};

export default Squad;

const Container = styled.div`
  margin: 5rem auto;

  .title {
    text-align: center;
    padding-bottom: 20px;
  }

  .squadParent {
    width: 90%;
    margin: auto;
    padding-top: 20px;
    display: flex;
    gap: 50px;
  }

  .squad {
    background: #041434;
    padding: 10px 25px;
    color: white;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }

  .squad h4 {
    font-size: 18px;
    text-transform: uppercase;
    cursor: pointer;
  }

  .squad button {
    color: white;
    border: none;
    background: inherit;
    cursor: pointer;
  }

  .addBtn {
    padding: 20px 40px;
    font-size: 80px;
    font-weight: 400;
    background: #d9d9d9;
    border: none;
    cursor: pointer;
    color: #041434;
    display: flex;
  }
  .addBtn span {
    width: 1px;
    height: 40px;
    display: block;
    background: #041434;
    outline: none;
  }

  .addBtn span:last-child {
    transform: rotate(90deg);
  }
`;

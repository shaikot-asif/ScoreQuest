import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getSquad } from "../../../../service/squad";
import Button from "../../../../components/shared/button/Button";
import { toast } from "react-hot-toast";
import { addMatch } from "../../../../service/match";

const InitValue = {
  teams: {
    requestingTeam: {
      userName: "",
      userId: "",
    },
    requestedTeam: {
      userName: "",
      userId: "",
    },
  },
  squads: {
    requestingTeamSquad: {
      squadId: "",
    },
  },
  date: "",
};

const AddMatch = ({ requestedTeam, setPlayMatchBtn }) => {
  const userState = useSelector((state) => state.user);
  const [squadData, setSquadData] = useState();
  const [matchValues, setMatchValues] = useState({ ...InitValue });
  const [isDisabled, setIsDisabled] = useState(true);

  console.log(matchValues, "matchValues");
  useEffect(() => {
    setMatchValues({
      ...matchValues,
      teams: {
        requestingTeam: {
          userId: userState.userInfo._id,
        },
        requestedTeam: { userId: requestedTeam },
      },
    });
  }, [requestedTeam, userState.userInfo._id]);

  const handleClickSingleSquad = ({ requestingTeamSquad }) => {
    setMatchValues({
      ...matchValues,
      squads: { requestingTeamSquad: { squadId: requestingTeamSquad } },
    });
  };

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

  const handleChange = (e) => {
    const { value } = e.target;

    setMatchValues({
      ...matchValues,
      date: value,
    });
  };

  useEffect(() => {
    if (
      matchValues.date === InitValue.date ||
      matchValues.squads === InitValue.squads
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [matchValues]);

  const { mutate } = useMutation({
    mutationFn: ({ matchValues }) => {
      return addMatch({ matchValues, token: userState.userInfo.token });
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    mutationKey: ["match"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ matchValues });
    setMatchValues({ ...InitValue });
    setPlayMatchBtn(false);
  };

  return (
    <div>
      <Container>
        <h4 className="title">Select a squad for this match</h4>

        <form onSubmit={handleSubmit}>
          <div className="squadParent">
            {squadIsLoading ? (
              <p>Loading...</p>
            ) : (
              squadData?.map((item, index) => (
                <div
                  onClick={() =>
                    handleClickSingleSquad({ requestingTeamSquad: item._id })
                  }
                  key={item._id}
                  className={`squad ${
                    matchValues.squads.requestingTeamSquad.squadId === item._id
                      ? "selectedSquad"
                      : ""
                  } `}
                >
                  <h4>squad {index + 1}</h4>
                  <h6>total player {item.selectedPlayer.length} </h6>
                </div>
              ))
            )}
          </div>

          <div className="dateTime">
            <h4 className="title">Select date and time</h4>

            <div className="dateTimeInput">
              <input
                type="datetime-local"
                value={matchValues.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button btnName={"submit"} type={"submit"} disabled={isDisabled} />
          <span className="close" onClick={() => setPlayMatchBtn(false)}>
            X
          </span>
        </form>
      </Container>
    </div>
  );
};

export default AddMatch;

const Container = styled.div`
  position: absolute;
  width: 100%;
  display: block;
  background: white;
  top: 25%;
  padding: 20px;
  border: 1px solid black;
  -webkit-box-shadow: 0px 0px 10px -4px rgba(4, 20, 52, 1);
  -moz-box-shadow: 0px 0px 10px -4px rgba(4, 20, 52, 1);
  box-shadow: 0px 0px 10px -4px rgba(4, 20, 52, 1);
  border-radius: 4px;
  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
  .title {
    text-align: center;
    padding-bottom: 20px;
  }

  .squadParent {
    display: flex;
    gap: 50px;
    cursor: pointer;
  }

  .squad {
    background: white;
    padding: 10px 25px;
    color: #041434;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
    border: 1px solid #041434;
  }

  .squad h4 {
    font-size: 18px;
    text-transform: uppercase;
  }
  .dateTimeInput input {
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
  }
  .selectedSquad {
    background: #041434;
    color: white;
    border: 1px solid #041434;
    -webkit-box-shadow: 0px 0px 10px -4px rgba(4, 20, 52, 1);
    -moz-box-shadow: 0px 0px 10px -4px rgba(4, 20, 52, 1);
    box-shadow: 0px 0px 10px -4px rgba(4, 20, 52, 1);
  }
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
`;

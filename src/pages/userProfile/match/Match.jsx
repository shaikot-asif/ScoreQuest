import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  deleteMatchById,
  getMatchByRequestedTeamId,
  getMatchByRequestingTeamId,
  updateMatch,
} from "../../../service/match";
import { getUser } from "../../../service/user";
import { useFetchUserNames } from "../../../hook/useFetchUserNames";

const Match = () => {
  const userState = useSelector((state) => state.user);
  const [matchData, setMatchData] = useState([]);
  const [requestedMatchData, setRequestedMatchData] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [requestedUserNames, setRequestedUserName] = useState([]);
  const [isRejectMatch, setIsRejectMatch] = useState({
    isBool: false,
    matchId: "",
  });

  const { data: requestingTeamData, isLoading } = useQuery({
    queryKey: ["match", userState.userInfo._id],
    queryFn: () =>
      getMatchByRequestingTeamId({
        token: userState.userInfo.token,
        RequestingTeamId: userState.userInfo._id,
      }),
  });

  const { data: requestedTeamData } = useQuery({
    queryKey: ["match"],
    queryFn: () =>
      getMatchByRequestedTeamId({
        RequestedTeamId: userState.userInfo._id,
        token: userState.userInfo.token,
      }),
  });

  useEffect(() => {
    if (requestingTeamData) {
      setMatchData(requestingTeamData);
    }
  }, [requestingTeamData]);

  useEffect(() => {
    if (requestedTeamData) {
      setRequestedMatchData(requestedTeamData);
    }
  }, [requestedTeamData]);

  useEffect(() => {
    async function fetchData() {
      const nameMap = await useFetchUserNames(matchData, userState);

      if (nameMap) {
        setUserNames(nameMap);
      }
    }
    fetchData();
    if (matchData.length > 0) {
      useFetchUserNames();
    }
  }, [matchData, userState.userInfo.token]);

  useEffect(() => {
    async function fetchData() {
      const nameMap = await useFetchUserNames(
        requestedTeamData,
        userState,
        false
      );

      if (nameMap) {
        setRequestedUserName(nameMap);
      }
    }
    fetchData();
    if (matchData.length > 0) {
      useFetchUserNames();
    }
  }, [requestedTeamData, userState.userInfo.token]);

  const { mutate } = useMutation({
    mutationKey: ["match"],
    mutationFn: async ({ rejected, matchId }) =>
      await updateMatch({ rejected, matchId }),
  });

  useEffect(() => {
    if (
      isRejectMatch.isBool &&
      window.confirm("Are you sure to cancel this match?")
    ) {
      if (isRejectMatch.matchId) {
        setIsRejectMatch((prev) => ({
          ...prev,
          isBool: true,
        }));
      }

      if (isRejectMatch.isBool) {
        mutate({
          rejected: isRejectMatch.isBool,
          matchId: isRejectMatch.matchId,
        });

        setIsRejectMatch({ isBool: false, matchId: "" });
      }
    }
  }, [isRejectMatch]);

  console.log(isRejectMatch);
  const handleMatchDelete = async ({ matchId }) => {
    if (window.confirm("Are you sure to delete this match?")) {
      const data = await deleteMatchById({
        matchId,
        token: userState.userInfo.token,
      });

      toast.success(data.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="container">
        <div>
          <h4>Requesting Match</h4>

          <div className="matchTeam">
            {matchData.length <= 0 ? (
              <p>There is no requesting match</p>
            ) : (
              matchData.map((item) => (
                <div key={item._id} className="matchItem">
                  <h5>
                    {userState.userInfo.name} <br /> vs <br />
                    {userNames[item.teams.requestedTeam.userId] || "Unknown"}
                  </h5>

                  <p>status: {item.status}</p>
                  <p>start: {new Date(item.date).toLocaleString()}</p>
                  <button
                    className={` ${
                      item.status === "accepted" ||
                      item.status === "completed" ||
                      item.status === "rejected"
                        ? "btnDisable"
                        : ""
                    }`}
                    disabled={
                      item.status === "accepted" ||
                      item.status === "completed" ||
                      item.status === "rejected"
                    }
                    type="text"
                    // onClick={() => rejectMatch({ matchId: item._id })}
                  >
                    Cancel
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <h4>Requested Match</h4>

          <div className="matchTeam">
            {requestedMatchData <= 0 ? (
              <p>There is no requested match</p>
            ) : (
              requestedMatchData.map((item) => (
                <div key={item._id} className="matchItem">
                  <h5>
                    {requestedUserNames[item.teams.requestingTeam.userId] ||
                      "Unknown"}
                    <br /> vs <br />
                    {userState.userInfo.name}
                  </h5>

                  <p>status: {item.status}</p>
                  <p>start: {new Date(item.date).toLocaleString()}</p>
                  <div className="btnFlex">
                    <button
                      className={` ${
                        item.status === "accepted" ||
                        item.status === "rejected" ||
                        item.status === "completed"
                          ? "btnDisable"
                          : ""
                      }`}
                      disabled={
                        item.status === "accepted" ||
                        item.status === "rejected" ||
                        item.status === "completed"
                      }
                      type="text"
                      onClick={() =>
                        setIsRejectMatch({ isBool: true, matchId: item._id })
                      }
                    >
                      Cancel
                    </button>
                    <button type="text">Accept</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Match;

const Container = styled.div`
  width: 90%;
  margin: 5rem auto;

  .container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
  }
  .container h4 {
    text-align: center;
    font-size: 18px;
    padding-bottom: 1rem;
  }

  .matchTeam {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    align-items: stretch;
    row-gap: 15px;
  }

  .matchItem {
    width: 24%;
    background: #041434;
    color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
    text-transform: capitalize;
    font-size: 12px;
  }

  .matchItem h5 {
    font-size: 14px;
    text-align: center;
    width: 100%;
  }

  .matchItem button {
    background: inherit;
    border: 1px solid white;
    color: white;
    padding: 5px 15px;
    border-radius: 25px;
    margin-top: 10px;
    cursor: pointer;
  }

  .itemBtn {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  .btnFlex {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  .btnDisable {
    cursor: no-drop !important;
  }
`;

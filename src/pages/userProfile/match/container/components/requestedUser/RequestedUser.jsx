import React, { useCallback, useEffect, useState, memo } from "react";
import MatchCard from "../MatchCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  acceptMatchByRequestedUser,
  getMatchByRequestedTeamId,
  rejectMatchByRequestedUser,
} from "../../../../../../service/match";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../../../../../../components/shared/Loading/Loading";
import { getSquad } from "../../../../../../service/squad";
import AddMatchCard from "../AddMatchCard/AddMatchCard";

const InitValue = {
  teams: {
    requestingTeam: {
      name: "",
      userId: "",
    },
    requestedTeam: {
      name: "",
      userId: "",
    },
  },
  squads: {
    requestedTeamSquad: {
      squadId: "",
    },
  },
  date: "",
  venue: "",
};

const RequestedUser = () => {
  const userState = useSelector((state) => state.user);
  const [matchValues, setMatchValues] = useState({ ...InitValue });
  const [isAccept, setIsAccept] = useState(false);
  const [matchId, setMatchId] = useState("");

  const [note, setNote] = useState("");

  const {
    data: matchData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requestedMatch"],
    queryFn: () =>
      getMatchByRequestedTeamId({
        RequestedTeamId: userState.userInfo.id,
        token: userState.userInfo.token,
      }),
  });

  const {
    data: squadData,
    refetch: squadRefetch,
    isLoading: squadIsLoading,
  } = useQuery({
    queryFn: useCallback(() => {
      return getSquad({
        userId: userState.userInfo.id,
        token: userState.userInfo.token,
      });
    }, [userState]),
    queryKey: ["squad"],
  });

  useEffect(() => {
    if (!squadData) {
      squadRefetch();
    }
  }, [squadData, squadRefetch]);

  const { mutate } = useMutation({
    mutationKey: ["match"],
    mutationFn: ({ matchId, note }) =>
      rejectMatchByRequestedUser({
        matchId: matchId,
        note: note,
        token: userState.userInfo.token,
      }),
    onSuccess: () => {
      toast.success("Match Deleted Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: acceptMutation } = useMutation({
    mutationKey: ["match"],
    mutationFn: ({ matchId, squadId }) =>
      acceptMatchByRequestedUser({
        matchId: matchId,
        squadId: squadId,
        token: userState.userInfo.token,
      }),
    onSuccess: () => {
      toast.success("Thank you for accept the match");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handelClickDeleteMatch = (data) => {
    if (window.confirm("Are you sure reject this match? ")) {
      mutate({ matchId: data, note: note });
      refetch();
    }
  };

  const handelClickAcceptMatch = (data) => {
    setMatchId(data);
    console.log(data, "handel click accept match");
    setIsAccept(!isAccept);
  };

  const handleClickSingleSquad = ({ requestedTeamSquad }) => {
    setMatchValues({
      ...matchValues,
      squads: { requestedTeamSquad: { squadId: requestedTeamSquad } },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    acceptMutation({
      matchId,
      squadId: matchValues.squads.requestedTeamSquad.squadId,
    });
    setMatchValues({ ...InitValue });
    setIsAccept(false);
  };

  console.log(matchValues, "matchValues");

  return (
    <div className="mt-10  flex flex-row flex-wrap justify-evenly">
      {!isLoading && matchData?.length === 0 ? (
        <h3 className="text-secondary-goldenPoppy text-xl ">
          There is no match found
        </h3>
      ) : !isLoading ? (
        matchData?.map((item) => {
          return (
            <MatchCard
              matchData={matchData}
              handelClickDeleteMatch={handelClickDeleteMatch}
              handelClickAcceptMatch={handelClickAcceptMatch}
              note={note}
              setNote={setNote}
              item={item}
              key={item._id}
              setMatchValues={setMatchValues}
              isAccept={isAccept}
              setIsAccept={setIsAccept}
              AddMatchCard={
                <AddMatchCard
                  matchValues={matchValues}
                  handleClickSingleSquad={handleClickSingleSquad}
                  squadData={squadData}
                  squadIsLoading={squadIsLoading}
                  title={"Add Squad"}
                  title2={"Selected Time"}
                  inputDisabled={true}
                  handleSubmit={handleSubmit}
                  teamSquad={"requestedTeamSquad"}
                  setPlayMatchBtn={setIsAccept}
                  buttonText={"Done"}
                  isDisabled={
                    matchValues.squads.requestedTeamSquad.squadId ? false : true
                  }
                />
              }
            />
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default RequestedUser;

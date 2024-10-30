import { useCallback, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getSquad } from "../../../../service/squad";
import { toast } from "react-hot-toast";
import { addMatch } from "../../../../service/match";
import Loading from "../../../../components/shared/Loading/Loading";
import SecondaryButton from "../../../../components/shared/button/SecondaryButton";
import { IoMdClose } from "react-icons/io";

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
    requestingTeamSquad: {
      squadId: "",
    },
  },
  date: "",
  venue: "",
};

const AddMatch = ({ requestedTeam, setPlayMatchBtn }) => {
  const userState = useSelector((state) => state.user);
  const [squadData, setSquadData] = useState();
  const [matchValues, setMatchValues] = useState({ ...InitValue });
  const [isDisabled, setIsDisabled] = useState(true);

  console.log(matchValues);
  useEffect(() => {
    setMatchValues({
      ...matchValues,
      teams: {
        requestingTeam: {
          userId: userState.userInfo.id,
          name: userState.userInfo.name,
        },
        requestedTeam: {
          userId: requestedTeam.requestedTeam,
          name: requestedTeam.requestedTeamName,
        },
      },
    });
  }, [requestedTeam, userState.userInfo]);

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
    queryFn: useCallback(() => {
      return getSquad({
        userId: userState.userInfo.id,
        token: userState.userInfo.token,
      });
    }, [userState]),
    queryKey: ["squad"],
  });

  useEffect(() => {
    if (squad) {
      setSquadData(squad);
    } else {
      squadRefetch();
    }
  }, [squad, squadRefetch]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setMatchValues({
      ...matchValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (
      matchValues.date === InitValue.date ||
      matchValues.squads === InitValue.squads ||
      matchValues.venue === InitValue.venue
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
      toast.success("Match Add Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    mutationKey: ["Match"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ matchValues });
    setMatchValues({ ...InitValue });
    setPlayMatchBtn(false);
  };

  return (
    <div className="fixed top-[3%] w-[70%] ">
      <div className="bg-natural-white p-10 w-[60%] relative m-auto rounded-md shadow-lg ">
        <h3 className="text-center text-3xl font-bold text-primary-darkNavy ">
          Add New Match
        </h3>
        <span className="border-b border-primary-brightOrange w-full block py-2"></span>
        <span className="text-center my-2 font-semibold capitalize text-accentColor-skyBlur block">
          {matchValues?.teams.requestingTeam?.name} VS{" "}
          {matchValues.teams.requestedTeam?.name}{" "}
        </span>
        <h4 className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
          Select a squad for this match
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between mt-2">
            {squadIsLoading ? (
              <Loading />
            ) : (
              squadData?.map((item, index) => (
                <div
                  onClick={() =>
                    handleClickSingleSquad({ requestingTeamSquad: item._id })
                  }
                  key={item._id}
                  className={`border shadow mb-5 p-5 rounded-md cursor-pointer capitalize ${
                    matchValues.squads.requestingTeamSquad.squadId ===
                      item._id && "border-primary-brightOrange"
                  } `}
                >
                  <h4>squad {index + 1}</h4>
                  <h6>total player {item.selectedPlayer.length} </h6>
                </div>
              ))
            )}
          </div>

          <div className="dateTime">
            <h4 className="mt-2 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
              Select Data and Time
            </h4>

            <div className="dateTimeInput">
              <input
                className="w-full cursor-pointer px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur"
                type="datetime-local"
                value={matchValues.date}
                name="date"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <h4 className="mt-6 text-md font-semibold text-accentColor-skyBlur capitalize mb-2 ">
              Venue
            </h4>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur"
              placeholder="Venue Location"
              value={matchValues.venue}
              name="venue"
              onChange={handleChange}
            />
          </div>

          <SecondaryButton
            isDisabled={isDisabled}
            text={"Add Match"}
            classes={"w-full mt-6"}
          />
          <span
            className="absolute top-5 cursor-pointer right-5 "
            onClick={() => setPlayMatchBtn(false)}
          >
            <IoMdClose />
          </span>
        </form>
      </div>
    </div>
  );
};

export default AddMatch;

import React from "react";
import { IoMdClose } from "react-icons/io";
import Loading from "../../../../../../components/shared/Loading/Loading";
import SquadCard from "../squadCard/SquadCard";
import SecondaryButton from "../../../../../../components/shared/button/SecondaryButton";

const AddMatchCard = ({
  title,
  title2,
  matchValues,
  handleSubmit,
  squadIsLoading,
  squadData,
  handleClickSingleSquad,
  handleChange,
  isDisabled,
  inputDisabled = false,
  setPlayMatchBtn,
  teamSquad,
  buttonText,
}) => {
  console.log(squadData, "squadData", matchValues, "matchValues");

  return (
    <div className="bg-natural-white p-10 w-[60%] relative m-auto rounded-md shadow-lg ">
      <h3 className="text-center text-3xl font-bold text-primary-darkNavy ">
        {title}
      </h3>
      <span className="border-b border-primary-brightOrange w-full block py-2"></span>
      <span className="text-center my-2 font-semibold capitalize text-accentColor-skyBlur block">
        {matchValues?.teams.requestingTeam?.name} VS{" "}
        {matchValues?.teams.requestedTeam?.name}{" "}
      </span>
      <h4 className="mt-5 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
        Select a squad for this match
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between mt-2">
          {squadIsLoading ? (
            <Loading />
          ) : squadData?.length === 0 ? (
            <p>There have no squad please add squad first</p>
          ) : (
            <SquadCard
              handleClickSingleSquad={handleClickSingleSquad}
              matchValues={matchValues}
              squadData={squadData}
              TeamSquad={teamSquad}
            />
          )}
        </div>

        <div className="dateTime">
          <h4 className="mt-2 text-md font-semibold capitalize text-accentColor-skyBlur mb-2 ">
            {title2}
          </h4>

          <div className="dateTimeInput">
            <input
              className={`${
                inputDisabled && "cursor-not-allowed"
              } w-full cursor-pointer px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur`}
              type="datetime-local"
              value={matchValues.date}
              disabled={inputDisabled}
              name="date"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <h4
            className={`mt-6 text-md font-semibold text-accentColor-skyBlur capitalize mb-2  `}
          >
            Venue
          </h4>
          <input
            type="text"
            disabled={inputDisabled}
            className={` w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur ${
              inputDisabled && "cursor-not-allowed"
            }`}
            placeholder="Venue Location"
            value={matchValues.venue}
            name="venue"
            onChange={handleChange}
          />
        </div>

        <SecondaryButton
          isDisabled={isDisabled}
          text={buttonText}
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
  );
};

export default AddMatchCard;

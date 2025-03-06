import React from "react";
import Loading from "../../../../../../../../../components/shared/Loading/Loading";
import SecondaryButton from "../../../../../../../../../components/shared/button/SecondaryButton";

const TosWinnerOverWicketsCard = ({
  isLoading,
  match,
  setWinnerDate,
  winnerDate,
  optionValues,
  handelWinner,
  handelSubmit,
}) => {
  return (
    <div className="bg-primary-midNight p-4 md:p-10 lg:w-[50%] w-[90%]  m-auto rounded-md  ">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h2 className="text-center text-xl md:text-3xl font-bold text-natural-white">
            Select Toss Winner
          </h2>

          <span className="border-b border-secondary-goldenPoppy w-full block py-2"></span>
          <span className="text-center my-2 font-semibold capitalize text-secondary-goldenPoppy block">
            {match?.teams.requestingTeam?.name} VS{" "}
            {match?.teams.requestedTeam?.name}{" "}
          </span>
          <div className="flex flex-col gap-5 mt-5 ">
            <div>
              <label
                className="mt-5 md:text-md font-semibold capitalize text-natural-white mb-2 "
                htmlFor="over"
              >
                How Many Overs Want's To Play?
              </label>
              <select
                onChange={(e) =>
                  setWinnerDate({ ...winnerDate, over: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-secondary-goldenPoppy"
                name="over"
                id="over"
              >
                <option>Select Over</option>
                {optionValues()?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="mt-5 md:text-md font-semibold capitalize text-natural-white mb-2 ">
                Who Won The Toss?
              </span>
              <div className="flex flex-wrap flex-col gap-2 md:flex-row justify-between">
                <h2
                  className={`border-secondary-goldenPoppy border transition-all duration-150 active:scale-95 text-natural-white p-5  rounded-md cursor-pointer capitalize ${
                    match?.teams?.requestingTeam?.userId ===
                      winnerDate.tossWinner &&
                    "bg-secondary-goldenPoppy !text-primary-midNight"
                  }
       `}
                  onClick={() =>
                    handelWinner(match?.teams?.requestingTeam?.userId)
                  }
                >
                  {match?.teams?.requestingTeam?.name}
                </h2>

                <h2
                  className={`border-secondary-goldenPoppy border transition-all duration-150 active:scale-95 text-natural-white  p-5 rounded-md cursor-pointer capitalize ${
                    match?.teams?.requestedTeam?.userId ===
                      winnerDate.tossWinner &&
                    "bg-secondary-goldenPoppy !text-primary-midNight"
                  } `}
                  onClick={() =>
                    handelWinner(match?.teams?.requestedTeam?.userId)
                  }
                >
                  {match?.teams?.requestedTeam?.name}
                </h2>
              </div>
            </div>

            <div>
              <span className=" md:text-md font-semibold capitalize text-natural-white mb-2 ">
                Total 11 players are playing right? if not select total player
              </span>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur"
                type="number"
                value={winnerDate.totalWickets}
                onChange={(e) =>
                  setWinnerDate({ ...winnerDate, totalWickets: e.target.value })
                }
              />
            </div>

            <span onClick={handelSubmit}>
              <SecondaryButton y={0} text={"Submit"} classes={"w-full"} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TosWinnerOverWicketsCard;

import React from "react";
import Loading from "../../../../../components/shared/Loading/Loading";
import PlayerTable from "../../../player/components/PlayerTable";
import { IoAddOutline } from "react-icons/io5";

const SquadCard = ({
  squadIsLoading,
  squadData,
  handleClickSingleSquad,
  handleClick,
  handleChange,
  setIsActive,
  setIsSquadActive,
  isSquadActive,
  isActive,
  playersLoading,
  players,
  handleSubmit,
  playersFromSquad,
  closeSquad,
}) => {
  return (
    <div className="flex flex-col mt-5 w-full ">
      <div className="">
        <h2 className="text-2xl font-bold text-center mb-6 text-natural-white">
          Manage Squad
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row items-center justify-center">
          <div className=" flex flex-row flex-wrap px-2 gap-5 justify-center items-center">
            {squadIsLoading ? (
              <Loading />
            ) : (
              squadData?.map((item, index) => (
                <div
                  key={item?._id}
                  className="flex gap-3 flex-col  rounded-md bg-primary-midNight text-natural-white px-6 py-4 uppercase hover:scale-95 duration-200 "
                >
                  <h4
                    className="text-center text-[18px] font-bold text-primary-brightOrange cursor-pointer "
                    onClick={() => handleClickSingleSquad({ _id: item?._id })}
                  >
                    squad {index + 1}
                  </h4>

                  <span className="border-b border-primary-darkNavy "></span>
                  <h6
                    className="cursor-pointer"
                    onClick={() => handleClickSingleSquad({ _id: item?._id })}
                  >
                    total player {item?.selectedPlayer.length}{" "}
                  </h6>
                  <div className="flex flex-row justify-between">
                    <span
                      className="cursor-pointer hover:underline inline"
                      onClick={() => handleClick({ squadId: item?._id })}
                    >
                      delete
                    </span>
                    <span
                      title="Coming Soon"
                      className="cursor-pointer hover:underline inline"
                    >
                      Edit
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="">
            {squadData?.length < 3 && (
              <div>
                <button
                  className="text-6xl text-secondary-goldenPoppy "
                  onClick={() => {
                    setIsActive(!isActive);
                    setIsSquadActive(false);
                  }}
                >
                  <IoAddOutline />
                </button>
              </div>
            )}
          </div>
        </div>

        {isActive &&
          (playersLoading ? (
            <Loading />
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
      </div>
    </div>
  );
};

export default SquadCard;

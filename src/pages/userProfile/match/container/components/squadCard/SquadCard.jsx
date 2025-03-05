import React from "react";

const SquadCard = ({
  squadData,
  handleClickSingleSquad,
  matchValues,
  TeamSquad,
}) => {
  return squadData?.map((item, index) => (
    <div
      onClick={() => handleClickSingleSquad({ [TeamSquad]: item._id })}
      key={item._id}
      className={`border  mb-2 lg:mb-5 p-2 lg:p-5 rounded-md text-natural-white active:scale-90 transition-all duration-200  cursor-pointer capitalize ${
        matchValues?.squads[TeamSquad]?.squadId === item._id &&
        "border-secondary-goldenPoppy bg-secondary-goldenPoppy !text-primary-blackRussian"
      } `}
    >
      <h4>squad {index + 1}</h4>
      <h6>total player {item.selectedPlayer.length} </h6>
    </div>
  ));
};

export default SquadCard;

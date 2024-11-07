import React from "react";
import PlayerTable from "../../../../../player/components/PlayerTable";

const PlayersList = ({
  players,
  title,
  isSelectPlayer,
  classes,
  handleBatter1Id,
  setSelectBatter1,
  setSelectBatter2,
}) => {
  return (
    <div className="">
      <PlayerTable
        players={players}
        title={title}
        isSelectPlayer={isSelectPlayer}
        classes={classes}
        selectedPlayerId={handleBatter1Id}
        setSelectBatter1={setSelectBatter1}
        setSelectBatter2={setSelectBatter2}
      />
    </div>
  );
};

export default PlayersList;

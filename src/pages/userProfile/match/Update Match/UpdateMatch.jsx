import React from "react";

import { useParams } from "react-router-dom";

const UpdateMatch = () => {
  const { matchId } = useParams();

  console.log(matchId, "matchId");

  return <div>update match</div>;
};

export default UpdateMatch;

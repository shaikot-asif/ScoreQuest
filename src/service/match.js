import axios from "axios";

export const addMatch = async ({ matchValues, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API}/api/match/addMatch`,
      matchValues,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getMatchByRequestingTeamId = async ({
  RequestingTeamId,
  token,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API
      }/api/match/requestingTeam?userId=${RequestingTeamId}`,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getMatchByRequestedTeamId = async ({ RequestedTeamId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API
      }/api/match/requestedTeam?userId=${RequestedTeamId}`,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const cancelMatchByRequestingUser = async ({ matchId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `${
        import.meta.env.VITE_API
      }/api/match/cancelMatchByRequestingUser?matchId=${matchId}`,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const rejectMatchByRequestedUser = async ({ matchId, note, token }) => {
  try {
    const rejectData = { matchId, note };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API}/api/match/rejectMatchByRequestedUser`,
      rejectData,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const acceptMatchByRequestedUser = async ({
  matchId,
  squadId,
  token,
}) => {
  try {
    const acceptedData = { matchId, squadId };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API}/api/match/acceptMatchByRequestedUser`,
      acceptedData,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getMatchByMatchId = async ({ matchId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API
      }/api/match/getMatchDetails?matchId=${matchId}`,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateOverAndTossWinner = async ({
  matchId,
  tossWinnerId,
  tossLooserId,
  inningsType,
  overs,
  totalPlayers,
  token,
}) => {
  try {
    const bodyValues = {
      matchId,
      tossWinnerId,
      tossLooserId,
      inningsType,
      overs,
      totalPlayers,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API}/api/match/updateOverAndTosWinner`,
      bodyValues,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateMatch = async ({
  matchId,
  selectedBowlerId,
  selectedBatterId,
  perBallOccurs,
  overCount,
  token,
}) => {
  try {
    const bodyValues = {
      matchId,
      selectedBowlerId,
      selectedBatterId,
      perBallOccurs,
      overCount,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API}/api/match/updateMatch`,
      bodyValues,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getTodayMatch = async ({
  searchKeywords,
  limit = 10,
  page = 1,
}) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API
      }/api/match/getTodayMatch?search=${searchKeywords}&limit=${limit}&page=${page}`
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getCompleteMatch = async ({
  searchKeywords,
  limit = 10,
  page = 1,
}) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API
      }/api/match/getCompleteMatch?search=${searchKeywords}&limit=${limit}&page=${page}`
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getUpcomingMatch = async ({
  searchKeywords,
  limit = 10,
  page = 1,
}) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API
      }/api/match/getUpcomingMatch?search=${searchKeywords}&limit=${limit}&page=${page}`
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

import axios from "axios";

export const addMatch = async ({ matchValues, token }) => {
  try {
    console.log(matchValues, "matchValues");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:4000/api/match/addMatch",
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
      `http://localhost:4000/api/match/requestingTeam?userId=${RequestingTeamId}`,
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
      `http://localhost:4000/api/match/requestedTeam?userId=${RequestedTeamId}`,
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
  rejected = false,
  accepted = false,
  matchId,
  token,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:4000/api/match/updateMatch?matchId=${matchId}`,
      {
        rejected,
      },
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
    console.log(matchId);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:4000/api/match/cancelMatchByRequestingUser?matchId=${matchId}`,
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
      `http://localhost:4000/api/match/rejectMatchByRequestedUser`,
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
      `http://localhost:4000/api/match/acceptMatchByRequestedUser`,
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

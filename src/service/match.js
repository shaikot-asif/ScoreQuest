import axios from "axios";

export const addMatch = async ({ matchValues, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:4000/api/match/addMatch",
      matchValues
    );

    console.log(data);

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
      `http://localhost:4000/api/match/requestingTeam?userId=${RequestingTeamId}`
    );

    console.log(data);

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
      `http://localhost:4000/api/match/requestedTeam?userId=${RequestedTeamId}`
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
}) => {
  console.log(rejected, matchId);
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/match/updateMatch?matchId=${matchId}`,
      {
        rejected,
      }
    );

    console.log(data, "updateData");
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteMatchById = async ({ matchId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:4000/api/match/deleteMatch?matchId=${matchId}`
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

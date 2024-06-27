import axios from "axios";

export const addSquad = async ({ userId, token, selectedPlayer }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:4000/api/squad/addSquad`,
      { selectedPlayer, userId },
      config
    );

    return data;
  } catch (error) {
    console.log(error, "error");
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getSquad = async ({ userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:4000/api/squad/getSquad?userId=${userId}`,
      config
    );

    return data;
  } catch (error) {
    console.log(error, "error");
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteSquad = async ({ squadId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:4000/api/squad/deleteSquad?squadId=${squadId}`
    );
    return data;
  } catch (error) {
    console.log(error, "error");
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getSquadById = async ({ _id, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:4000/api/squad/getSquadById?_id=${_id}`
    );

    return data;
  } catch (error) {
    console.log(error, "error");
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

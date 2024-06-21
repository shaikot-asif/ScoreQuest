import axios from "axios";

export const addPlayer = async ({ formData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "http://localhost:4000/api/players/addPlayer",

      formData,
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

export const getPlayers = async ({ userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:4000/api/players/getPlayers?userId=${userId}`,
      config
    );

    console.log("players: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlayer = async ({ playerId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:4000/api/players/getPlayer?playerId=${playerId}`,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePlayer = async ({ formData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      "http://localhost:4000/api/players/updatePlayer",

      formData,
      config
    );

    console.log("data", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deletePlayer = async ({ playerId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:4000/api/players/deletePlayer?playerId=${playerId}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

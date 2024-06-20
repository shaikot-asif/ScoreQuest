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

    console.log("data", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getPlayers = async ({ userId }) => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/players/getPlayers",
      userId
    );

    console.log("players: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

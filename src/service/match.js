import axios from "axios";

export const addMatch = async ({ matchValues, token }) => {
  console.log(matchValues);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
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

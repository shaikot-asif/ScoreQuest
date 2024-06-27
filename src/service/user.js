import axios from "axios";

export const signup = async ({ name, email, phone, password }) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/users/register",
      {
        name,
        email,
        phone,
        password,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const login = async ({ valueType, value, password }) => {
  try {
    const { data } = await axios.post("http://localhost:4000/api/users/login", {
      value,
      password,
      valueType,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getUsers = async ({
  token,
  searchKeywords,
  limit = 10,
  page = 1,
}) => {
  console.log("search: ", searchKeywords);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:4000/api/users/getAllUsers?search=${searchKeywords}&limit=${limit}&page=${page}`,
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

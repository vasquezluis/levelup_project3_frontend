import axios from "axios";

// axios instance

const authAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth",
});

/**
 * * endpoints functions
 */

export const authFunction = async (body) => {
  const response = await authAPI.post("/", body);

  return response.data.body;
};

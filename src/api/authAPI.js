import axios from "axios";

// axios instance

const authAPI = axios.create({
  baseURL: "https://pelispelis-backend.onrender.com/api/v1/login",
});

/**
 * * endpoints functions
 */

export const authFunction = async (body) => {
  const response = await authAPI.post("/", body);

  return response.data;
};

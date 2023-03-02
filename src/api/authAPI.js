import axios from "axios";

// axios instance

const authAPI = axios.create({
  baseURL: "ec2-52-15-71-160.us-east-2.compute.amazonaws.com/api/v1/login",
});

/**
 * * endpoints functions
 */

export const authFunction = async (body) => {
  const response = await authAPI.post("/", body);

  return response.data;
};

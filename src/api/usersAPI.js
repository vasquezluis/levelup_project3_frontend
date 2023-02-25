import axios from "axios";

// axios instance

const usersAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1/users",
});

/**
 * * endpoints functions
 */

export const getItem = async (id) => {
  const response = await usersAPI.get(`/${id}`);

  return response.data.body;
};

export const getItems = async () => {
  const response = await usersAPI.get("/");

  return response.data.body;
};

export const getReservations = async (userId) => {
  const response = await usersAPI.get(`/${userId}/reservations`);

  return response.data.body;
};

export const createItem = async (body) => {
  const response = await usersAPI.post("/", body);

  return response.data.body;
};

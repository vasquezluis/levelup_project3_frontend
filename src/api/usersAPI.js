import axios from "../libs/axios.js";

/**
 * * endpoints functions
 */

export const getItem = async (id) => {
  const response = await axios.get(`/users/${id}`);

  return response.data.body;
};

export const getItems = async () => {
  const response = await axios.get("/users");

  return response.data.body;
};

export const getReservations = async (userId) => {
  const response = await axios.get(`/users/${userId}/reservations`);

  return response.data.body;
};

export const createItem = async (body) => {
  const response = await axios.post("/users/", body);

  return response.data.body;
};

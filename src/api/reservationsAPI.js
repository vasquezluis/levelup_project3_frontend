import axios from "../libs/axios";

/**
 * * endpoints functions
 */

export const getItem = async (id) => {
  const response = await axios.get(`/reservations/${id}`);

  return response.data.body;
};

export const getItems = async () => {
  const response = await axios.get("/reservations");

  return response.data.body;
};

export const createItem = async (reservation) => {
  const response = await axios.post("/reservations", reservation);

  return response.data.body;
};

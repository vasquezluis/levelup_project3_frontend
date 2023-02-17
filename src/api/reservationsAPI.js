import axios from "axios";

// axios instance

const reservationsAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1/reservations",
});

/**
 * * endpoints functions
 */

export const getItem = async (id) => {
  const response = await reservationsAPI.get(`/${id}`);

  return response.data.body;
};

export const getItems = async () => {
  const response = await reservationsAPI.get("/");

  return response.data.body;
};

export const createItem = (reservation) =>
  reservationsAPI.post("/", reservation);

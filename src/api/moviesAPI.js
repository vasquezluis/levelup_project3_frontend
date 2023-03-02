import axios from "../libs/axios.js";

// axios instance

const moviesAPI = axios.create({
  baseURL: "https://pelispelis-backend.onrender.com/api/v1/movies",
});

/**
 * * endpoints functions
 */

export const getItem = async (id) => {
  const response = await moviesAPI.get(`/${id}`);

  return response.data.body;
};

export const getMovieSeats = async (id) => {
  const response = await moviesAPI.get(`/${id}/seats`);

  return response.data.body;
};

export const getItems = async () => {
  const response = await moviesAPI.get("/");

  return response.data.body;
};

export const createItem = (movie) => axios.post("/movies", movie);

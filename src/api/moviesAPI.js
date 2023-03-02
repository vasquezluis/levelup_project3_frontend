import axios from "../libs/axios.js";

// axios instance

const moviesAPI = axios.create({
  baseURL: "ec2-52-15-71-160.us-east-2.compute.amazonaws.com/api/v1/movies",
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

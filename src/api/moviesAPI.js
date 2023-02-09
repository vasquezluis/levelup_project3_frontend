import axios from "axios";

// axios instance

const moviesAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1/movies",
});

/**
 * * endpoints functions
 */

export const getItems = async () => {
  const response = await moviesAPI.get("/");

  return response.data.body;
};

export const createItem = (movie) => moviesAPI.post("/", movie);

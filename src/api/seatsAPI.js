import axios from "../libs/axios.js";

// axios instance

const seatsAPI = axios.create({
  baseURL: "https://pelispelis-backend.onrender.com/api/v1/seats",
});

/**
 * * endpoints functions
 */

export const getItem = async (id) => {
  const response = await moviesAPI.get(`/${id}`);

  return response.data.body;
};

export const getItems = async () => {
  const response = await moviesAPI.get("/");

  return response.data.body;
};

export const createItem = (body) => axios.post("/seats", body);

export const updateItem = ({ seatsId, body }) =>
  axios.put(`/seats/${seatsId}`, body);
// export const updateItem = ({ seatsId, body }) => {
//   console.log(seatsId);
//   console.log(body);
// };

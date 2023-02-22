import axios from "axios";

// axios instance

const accreditationsAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1/accreditations",
});

/**
 * * endpoints functions
 */

export const getItems = async () => {
  const response = await accreditationsAPI.get("/");

  return response.data.body;
};

export const getActiveItems = async () => {
  const response = await accreditationsAPI.get("/active");

  return response.data.body;
};

export const createItem = async (body) => {
  const response = await accreditationsAPI.post(`/`, body);

  return response.data.body;
};

export const acceptItem = async ({ id, credits }) => {
  console.log(id, credits);

  const response = await accreditationsAPI.put(`/${id}/accept`, { credits });

  return response.data.body;
};

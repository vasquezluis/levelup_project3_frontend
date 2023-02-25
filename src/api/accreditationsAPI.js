import axios from "../libs/axios.js";

/**
 * * endpoints functions
 */

export const getItems = async () => {
  const response = await axios.get("/accreditations");

  return response.data.body;
};

export const getActiveItems = async () => {
  const response = await axios.get("/accreditations/active");

  return response.data.body;
};

export const createItem = async (body) => {
  const response = await axios.post(`/accreditations`, body);

  return response.data.body;
};

export const acceptItem = async ({ id, credits }) => {
  console.log(id, credits);

  const response = await axios.put(`/accreditations/${id}/accept`, { credits });

  return response.data.body;
};

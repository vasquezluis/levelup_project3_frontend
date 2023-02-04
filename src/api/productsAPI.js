import axios from "axios";

// axios instance

const productAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1/products",
});

/**
 * * endpoints functions
 */

export const getItems = async () => {
  const response = await productAPI.get("/");

  return response.data.body;
};

export const createItem = (product) => productAPI.post("/", product);

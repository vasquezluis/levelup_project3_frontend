import axios from "axios";
// import { useAuthStore } from "../store/auth";

// TODO to add token to axios headers

const authAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// TODO adding headers: token saved on local storage
authAPI.interceptors.request.use((config) => {
  // ? token from local storage
  // const token = useAuthStore.getState().token;

  config.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTk4NjFkYTMyYzkzOWJhYzQyNzlmMSIsInVzZXIiOiJsdWlzdmFzcXVleiIsInJvbGVzIjpbImFkbWluIl0sInBlcm1pc3Npb25zIjpbImFkbWluIl0sImlhdCI6MTY3NzM0NDQ3MywiZXhwIjoxNjc3MzYyNDczfQ.KzmdacilevmJwcj0QWo0S8zzdbFAjwgqZ4J1-hMsqXo`;

  return config;
});

export default authAPI;

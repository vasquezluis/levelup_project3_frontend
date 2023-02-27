import axios from "axios";

// TODO to add token to axios headers

// const { token } = useSelector((state) => state.user);

const authAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// TODO adding headers: token saved on local storage
authAPI.interceptors.request.use((config) => {
  // ? token from local storage
  // const token = useAuthStore.getState().token;

  config.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTk4NjFkYTMyYzkzOWJhYzQyNzlmMSIsInVzZXIiOiJsdWlzdmFzcXVleiIsInJvbGVzIjpbImFkbWluIl0sInBlcm1pc3Npb25zIjpbImFkbWluIl0sImlhdCI6MTY3NzUxMTEwMywiZXhwIjoxNjc3NTk3NTAzfQ.KAqgQuiroaC3j-NOiHz-pPZ7Zw0LcibPKxPPUldF7x8`;

  return config;
});

export default authAPI;

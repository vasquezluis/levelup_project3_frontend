import axios from "axios";

// TODO to add token to axios headers

// const { token } = useSelector((state) => state.user);
const userData = JSON.parse(window.localStorage.getItem("loggedUser"));

const authAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// TODO adding headers: token saved on local storage
authAPI.interceptors.request.use((config) => {
  // ? token from local storage
  // const token = useAuthStore.getState().token;

  config.headers.authorization = `Bearer ${userData.token}`;
  console.log(`Bearer ${userData.token}`);

  return config;
});

export default authAPI;

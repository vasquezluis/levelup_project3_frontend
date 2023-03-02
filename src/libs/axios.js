import axios from "axios";

// TODO to add token to axios headers

// const { token } = useSelector((state) => state.user);

const authAPI = axios.create({
  baseURL: "https://pelispelis-backend.onrender.com/api/v1",
  withCredentials: true,
});

export const getTokenFromLocalStorage = (tokenFromLocalStorage) => {
  const token = tokenFromLocalStorage;

  // TODO adding headers: token saved on local storage
  authAPI.interceptors.request.use((config) => {
    // ? token from local storage
    // const token = useAuthStore.getState().token;

    config.headers.authorization = `Bearer ${token}`;

    return config;
  });
};

export default authAPI;

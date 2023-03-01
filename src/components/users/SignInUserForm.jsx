import { useRef } from "react";
import { authFunction } from "../../api/authAPI";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userSlice";
import { getTokenFromLocalStorage } from "../../libs/axios";

function SignInUserForm() {
  const dispatch = useDispatch();
  const formRef = useRef();
  const navigate = useNavigate();
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [userMessage, setUserMessage] = useState(false);

  const loginMutation = useMutation({
    mutationFn: authFunction,
    onSuccess: (data, variables, context) => {
      // local storage for token
      window.localStorage.setItem("loggedUser", JSON.stringify(data));

      dispatch(
        setUser({
          id: data.userData.id,
          roles: data.userData.roles,
          user: data.userData.user,
        })
      );

      // * set token to axios operations
      // const loggedUser = window.localStorage.getItem("loggedUser");
      // const user = JSON.parse(loggedUser);
      getTokenFromLocalStorage(`${data.token}`);

      // * redirect
      if (data.userData.roles.includes("admin")) {
        navigate("/admindash");
      } else if (data.userData.roles.includes("user")) {
        navigate("/userdash");
      }
    },
    onError: (error, variables, context) => {
      if (error.response.status == 404) {
        setUserMessage(true);
        // setPasswordMessage(false);
      }
      if (error.response.status == 401) {
        setPasswordMessage(true);
        setUserMessage(false);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // ? getting form data
    const loginData = Object.fromEntries(formData); // ? creatind product object from formData

    try {
      loginMutation.mutate(loginData);
    } catch (error) {
      console.log(error.message);
    }

    formRef.current.reset();
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-3 focus:shadow-outline"
            id="username"
            name="user"
            type="text"
            placeholder="Usuario"
            required
          />
          <p className="text-red-500 text-xs italic">
            {userMessage ? "Usuario no encontrado" : ""}
          </p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******"
            required
          />
          <p className="text-red-500 text-xs italic">
            {passwordMessage ? "Contraseña incorrecta" : ""}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignInUserForm;

import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createItem } from "../../api/usersAPI";

function SignUpUserForm() {
  // * reference to form for clear data fields
  const formRef = useRef();
  const navigate = useNavigate();

  // * mutation config
  const addUserMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      alert("Usuario creado");
    },
    onError: () => {
      alert("Error creando usuario");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData);

    if (Object.values(user).length !== 8) alert("Rellena todos los campos");

    if (user.password == user.password2) {
      delete user.password2;
      addUserMutation.mutate(user);

      formRef.current.reset();

      navigate("/login");
    } else {
      alert("Las contrase;as deben coincidir");
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit} ref={formRef}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Nombres
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            name="name"
            type="text"
            placeholder="Elias Julian"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="lastname"
          >
            apellidos
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Hernandez Torres"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="identification"
          >
            Identificacion
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="identification"
            name="identification"
            type="text"
            placeholder="7894561239510"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="phone"
          >
            Telefono
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="phone"
            name="phone"
            type="text"
            placeholder="56453221"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            name="email"
            type="email"
            placeholder="user@gmail.com"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="user"
          >
            Usuario
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="user"
            name="user"
            type="text"
            placeholder="usuario1234"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2 mt-2">
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="passwordSignUp1"
          >
            Contraseña
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="passwordSignUp1"
            name="password"
            type="password"
            placeholder="******"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="passwordSignUp2"
          >
            Repite contraseña
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="passwordSignUp2"
            name="password2"
            type="password"
            placeholder="******"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2 pt-2">
        <div className="w-full md:w-1/2 px-3 flex flex-col justify-end items-start">
          <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Aceptar
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUpUserForm;

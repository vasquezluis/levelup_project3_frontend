import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

import { acceptItem } from "../../api/accreditationsAPI";

function AccreditationsCard({ id, user, credits, coupon }) {
  const formRef = useRef(); // ? ref form
  const queryClient = useQueryClient(); // ? query client to invalidate data

  // TODO accept item on api
  const acceptAccreditationMutation = useMutation({
    mutationFn: acceptItem,
    onSuccess: () => {
      alert("Solicitud aceptada");
      queryClient.invalidateQueries("accreditations");
    },
  });

  // TODO: handle submit section
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const item = Object.fromEntries(formData);

    if (item.credits.length == 0) {
      alert("Escribe la cantidad de creditos a enviar");
    } else {
      acceptAccreditationMutation.mutate({
        id,
        credits: item.credits,
      });
    }
  };

  return (
    <div className="lg:max-w-xs rounded shadow-lg bg-gray-50 m-1 p-2">
      <p>Usuario: {user}</p>
      <p>Creditos: {credits}</p>
      <p>Cupon: {coupon}</p>
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-4 pb-4 mb-2 mt-2"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xs font-bold mb-2"
              htmlFor="credits"
            >
              Creditos a enviar
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={id}
              name="credits"
              type="number"
              placeholder="150"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccreditationsCard;

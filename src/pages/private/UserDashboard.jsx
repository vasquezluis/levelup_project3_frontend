import { useRef } from "react";
import {
  useMutation,
  QueryClient,
  useQuery,
  useQueryClient,
} from "react-query";

import { getReservations, getItem } from "../../api/usersAPI";
import { createItem } from "../../api/accreditationsAPI";

import ReservationCard from "../../components/reservations/ReservationCard";
import AccreditationsForm from "../../components/accreditations/AccreditationsForm";

function UserDashboard() {
  const userId = "63f7eb93f497ed2c931f6850";

  // TODO: fetching reservations data
  const reservationsQuery = useQuery({
    queryKey: ["reservations"],
    queryFn: () => getReservations(userId),
    select: (items) => items.reverse(),
  });
  // TODO: fetching user data
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getItem(userId),
  });

  // TODO: Submit logic
  const createAccreditationMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      alert("Solicitud creada");
    },
  });

  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const item = Object.fromEntries(formData);

    if (item.credits.length == 0) {
      alert("Escribe la cantidad de creditos a solicitar");
    } else {
      createAccreditationMutation.mutate({
        userId: userId,
        paid: true,
        coupon: null,
        ...item,
      });

      formRef.current.reset();
    }
  };

  // TODO render return
  if (reservationsQuery.isLoading) return <div>Loading reservations...</div>;
  if (userQuery.isLoading) return <div>Loading user data...</div>;

  if (reservationsQuery.isError)
    return <div>Error: {reservationsQuery.error.message}</div>;
  if (userQuery.isError) return <div>Error: {userQuery.error.message}</div>;

  return (
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-wrap justify-center">
        {/* Accreditation/user section */}
        <div className="p-2">
          <div className="bg-white flex flex-col px-5 ">
            {/* user */}
            <div className="bg-white flex flex-col items-start pt-3 pb-3">
              <p className="text-xl font-bold">
                Usuario:
                <span className="font-normal"> {userQuery.data.user}</span>
              </p>
              <p className="text-xl font-bold">
                Creditos disponibles:
                <span className="font-normal"> {userQuery.data.credits}</span>
              </p>
            </div>

            {/* title */}
            <div className="bg-white flex flex-col items-center pt-3 pb-3">
              <p className="text-2xl font-bold ">Solicitar creditos</p>
            </div>
            {/* Form */}
            <div className="flex flex-col">
              <div className="w-full max-w-xs">
                <AccreditationsForm
                  formRef={formRef}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>

          {/* User information section */}
          <div className="bg-white flex flex-col px-5 mt-5">
            {/* user */}
            <div className="bg-white flex flex-col items-start pt-3 pb-3">
              <p className="font-bold">
                Usuario:
                <span className="font-normal"> {userQuery.data.user}</span>
              </p>
              <p className="font-bold">
                Creditos:
                <span className="font-normal"> {userQuery.data.credits}</span>
              </p>
              <p className="font-bold">
                Nombres:
                <span className="font-normal"> {userQuery.data.name}</span>
              </p>
              <p className="font-bold">
                Apellidos:
                <span className="font-normal"> {userQuery.data.lastname}</span>
              </p>
              <p className="font-bold">
                Identificacion:
                <span className="font-normal"> {userQuery.data.identification}</span>
              </p>
              <p className="font-bold">
                Correo:
                <span className="font-normal"> {userQuery.data.email}</span>
              </p>
              <p className="font-bold">
                Telefono:
                <span className="font-normal"> {userQuery.data.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* reservations section */}
        <div className="p-2">
          {/* title */}
          <div className="text-3xl font-bold bg-white flex flex-col items-center pt-3 pb-3">
            Mis reservaciones
          </div>
          {/* items listing */}
          <div className="bg-white grid md:grid-cols-3 lg:grid-cols-4 p-4">
            {reservationsQuery.data.map((item, index) => (
              <ReservationCard
                key={index}
                moviePoster={item.moviePoster}
                movie={item.movie}
                totalCredits={item.totalCredits}
                seats={item.seats}
                schedule={item.schedule.schedule}
                date={item.schedule.date}
                cinema={item.schedule.cinema}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

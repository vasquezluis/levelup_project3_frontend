import { useQuery } from "react-query";

import AdminMovieCard from "../../components/movies/AdminMovieCard";
import UserCard from "../../components/users/UserCard";
import MoviesForm from "../../components/movies/MoviesForm";
import AccreditationsCard from "../../components/accreditations/AccreditationsCard";

import { getItems as moviesItems } from "../../api/moviesAPI";
import { getItems as usersItems } from "../../api/usersAPI";
import { getActiveItems as accreditationsItems } from "../../api/accreditationsAPI";

function AdminDashboard() {
  // TODO: fetching movie data from API
  const moviesQuery = useQuery({
    queryKey: ["movies"],
    queryFn: moviesItems,
    select: (items) => items.reverse(),
  });
  // TODO: fetching users data from API
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: usersItems,
    select: (items) => items.reverse(),
  });
  // TODO: fetching active accreditations data from API
  const accreditationsQuery = useQuery({
    queryKey: ["accreditations"],
    queryFn: accreditationsItems,
    select: (items) => items.reverse(),
  });

  // TODO render section
  if (moviesQuery.isLoading) return <div>Loading movies...</div>;
  if (usersQuery.isLoading) return <div>Loading users...</div>;
  if (accreditationsQuery.isLoading)
    return <div>Loading accreditations...</div>;

  if (moviesQuery.isError) return <div>Error: {moviesQuery.error.message}</div>;
  if (usersQuery.isError) return <div>Error: {usersQuery.error.message}</div>;
  if (accreditationsQuery.isError)
    return <div>Error: {accreditationsQuery.error.message}</div>;

  return (
    <div className="mt-5">
      <div className="flex flex-wrap md:flex-wrap lg:flex-nowrap justify-center">
        {/* accreditations/users section */}
        <div className="p-2 w-full">
          {/* Title */}
          <div className="bg-white flex flex-col items-center pt-3 pb-3">
            <p className="text-2xl font-bold ">Solicitudes de credito</p>
            <p>Cupon del dia: PELISPELIS</p>
          </div>

          {/* accreditations list with form */}
          <div className="bg-white grid md:grid-cols-2 lg:grid-cols-3">
            {accreditationsQuery.data.map((item, index) => (
              <AccreditationsCard
                key={index}
                id={item._id}
                user={item.user}
                credits={item.credits}
                coupon={item.coupon}
              />
            ))}
          </div>

          {/* title */}
          <div className="bg-white flex flex-col items-center pt-3 pb-3 mt-5">
            <p className="text-2xl font-bold ">Lista de usuarios</p>
          </div>

          {/* clients list */}
          <div className="bg-white grid md:gri-cols-2 lg:grid-cols-3 pb-3 content-center">
            {usersQuery.data.map((item, index) => (
              <UserCard
                key={index}
                user={item.user}
                name={item.name}
                roles={item.roles}
                lastname={item.lastname}
                credits={item.credits}
                identification={item.identification}
                email={item.email}
              />
            ))}
          </div>
        </div>

        {/* movies section */}
        <div className="p-2 w-full">
          {/* Title */}
          <div className="bg-white flex flex-col items-center pt-3 pb-3">
            <p className="text-2xl font-bold ">Agregar pelicula</p>
          </div>

          {/* movies form */}
          <div className="bg-white flex flex-col items-center pt-3 pb-3">
            <MoviesForm />
          </div>

          {/* Title */}
          <div className="bg-white flex flex-col items-center pt-3 pb-3 mt-5">
            <p className="text-2xl font-bold ">Peliculas disponibles</p>
          </div>

          {/* movies listing */}
          <div className="bg-white flex lg:flex-wrap justify-center">
            {moviesQuery.data.map((item, index) => (
              <AdminMovieCard
                key={index}
                name={item.name}
                poster={item.poster}
                genders={item.genders}
                cost={item.cost}
                sinopsis={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

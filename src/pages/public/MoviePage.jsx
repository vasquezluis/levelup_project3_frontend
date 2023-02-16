import { useParams, useLocation } from "react-router-dom";
import dateFormat from "dateformat";
import { useQuery } from "react-query";
import { getItem } from "../../api/moviesAPI";
import PageNavbar from "../../components/_partials/PageNavBar";

// useLocation for know the current url
// useParams for params on url

function MoviePage() {
  // * links for navbar
  const links = [
    { title: "Suspenso" },
    { title: "Terror" },
    { title: "Accion" },
    { title: "Ciencia ficcion" },
    { title: "Romance" },
    { title: "Deporte" },
  ];

  // ? id from url
  const { id } = useParams();

  console.log(id);

  const {
    isLoading,
    data: movie,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: () => getItem(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full w-full bg-white">
      <div className="bg-gray-900 flex flex-col pt-5 pb-2 items-center w-full">
        <p className="text-3xl font-bold">Cartelera</p>
      </div>

      <PageNavbar items={links} />

      <div className="flex flex-nowrap p-5 mt-2 items-center text-black justify-center">
        <div className="max-w-lg">
          <img className="w-[80%]" src={movie.poster} alt={movie.name} />
        </div>
        <div className="max-w-md">
          <p className="text-3xl font-bold mb-3">{movie.name}</p>
          <p className="text-justify mb-3">{movie.description}</p>
          {movie.genders.map((item) => (
            <span className="bg-gray-300 px-2 rounded-md mr-1">{item}</span>
          ))}
        </div>
        <div className="w-auto px-10 flex flex-col justify-end">
          <p className="text-3xl font-bold mb-3">Reserva la pelicula</p>

          {movie.schedules.map((item) => (
            <div className="rounded p-2 m-1 bg-gray-300 hover:text-white hover:bg-gray-900 hover:scale-110 cursor-pointer duration-75">
              <p>Costo: {movie.cost} creditos</p>
              <p>Horario: {item.schedule}</p>
              <p>Fecha: {dateFormat(item.date, "mmmm dS, yyyy")}</p>
              <p>Sala: {item.cinema}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;

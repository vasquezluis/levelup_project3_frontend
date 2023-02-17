import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useOutlet } from "react-router-dom";
import { getItems } from "../../api/moviesAPI";
import MovieCard from "../../components/movies/MovieCard";
import PageNavbar from "../../components/_partials/PageNavBar";

function Cartelera() {
  const outlet = useOutlet();

  // * links for filter
  const links = [
    { title: "Suspenso" },
    { title: "Terror" },
    { title: "Accion" },
    { title: "Ciencia ficcion" },
    { title: "Romance" },
    { title: "Deporte" },
  ];

  //* get al variables of react-query
  const {
    isLoading,
    data: movies,
    isError,
    error,
  } = useQuery({
    //* data from react-query

    queryKey: ["movies"], ///* name of query

    queryFn: getItems, //* execute function

    select: (items) => items.reverse(), //* can use for sort items (optional)
  });

  const queryClient = useQueryClient(); //* method for reload items

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // * page creation
  return (
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-wrap justify-center">
        {/* title section */}
        <div className="flex m-3 flex-wrap justify-center gap-1">
          <p className="text-3xl font-bold">Peliculas disponibles</p>
        </div>

        {/* movies list section */}
        {/* <div className="flex m-3 flex-wrap w-full justify-center gap-1"> */}
        <div className="p-2">
          <div className="bg-white grid md:grid-cols-5 lg:grid-cols-7">
            {movies.map((movie, index) => {
              if (movie.active) {
                return (
                  <Link to={`/cartelera/${movie._id}`} key={index}>
                    <MovieCard
                      name={movie.name}
                      poster={movie.poster}
                      sinopsis={movie.description}
                      genders={movie.genders}
                      schedules={movie.schedules}
                    />
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartelera;

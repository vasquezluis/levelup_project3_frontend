import { useQuery, useMutation, useQueryClient } from "react-query";
import { useOutlet } from "react-router-dom";
import { getItems } from "../../api/moviesAPI";
import MoviesList from "../../components/movies/MoviesList";
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

    select: (products) => products.reverse(), //* can use for sort items (optional)
  });

  const queryClient = useQueryClient(); //* method for reload items

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // * page creation
  return (
    <>
      <div className="bg-gray-900 flex flex-col pt-5 pb-2 items-center w-full">
        <p className="text-3xl font-bold">Cartelera</p>
      </div>

      <PageNavbar items={links} />

      <div className="grid md:grid-cols-5 lg:grid-cols-7">
        {movies.map((movie, index) => (
          <MoviesList
            key={index}
            name={movie.name}
            poster={movie.poster}
            sinopsis={movie.description}
            genders={movie.genders}
            schedules={movie.schedules}
          />
        ))}
      </div>
    </>
  );
}

export default Cartelera;
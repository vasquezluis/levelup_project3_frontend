import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getItems } from "../../api/moviesAPI";

function Index() {
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

    // select: (products) => products.sort((a,b) => ) //* can use for sort items (optional)
  });

  // * random movie to show
  const randomMovie = () => {
    const randomNumber = Math.floor(Math.random() * movies.length);

    const movie = movies[randomNumber];

    return movie;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const movieToShow = randomMovie();
  const movieToShow2 = randomMovie();

  return (
    <div className="h-full w-full">
      <div className="bg-gray-900 flex flex-col w-full items-center py-5">
        <p className="text-4xl font-bold ">Peliculas destacadas</p>
        <p className="py-3">
          Cada semana te traemos las mejores peliculas internacionales del
          momento
        </p>
      </div>
      {/* top part */}
      <div className="w-full mx-auto py-10 bg-gray-900 grid lg:grid-cols-2 gap-5">
        {/* Poster  */}
        <div className="p-5 pl-10 flex">
          <img
            className="w-[50%]"
            src={movieToShow.poster}
            alt={movieToShow.name}
          />
          <div className="flex flex-col pl-10 pt-10 max-w-sm">
            <h2 className=" text-3xl font-bold mb-4">{movieToShow.name}</h2>
            <p className="mb-4">Sinopsis: {movieToShow.description.substring(0, 200)}...</p>
            <p>
              Genero:
              {movieToShow.genders.map((item, index) => (
                <span
                  className="text-gray-900 bg-gray-200 px-1 mx-1 rounded-md"
                  key={index}
                >
                  {item}
                </span>
              ))}
            </p>
          </div>
        </div>
        {/* Poster  */}
        <div className="p-5 pl-10 flex">
          <img
            className="w-[50%]"
            src={movieToShow2.poster}
            alt={movieToShow2.name}
          />
          <div className="flex flex-col pl-10 pt-10 max-w-sm">
            <h2 className="text-3xl font-bold mb-4">{movieToShow2.name}</h2>
            <p className="mb-4">Sinopsis: {movieToShow2.description.substring(0, 200)}...</p>
            <p>
              Genero:
              {movieToShow2.genders.map((item, index) => (
                <span
                  className="text-gray-900 bg-gray-200 px-1 mx-1 rounded-md"
                  key={index}
                >
                  {item}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      {/* below part */}
      <div className="text-center bg-gray-900 ">
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            consequuntur nemo labore laborum enim itaque dolores sed, ad
            ratione! Voluptates aliquam sequi ipsa eum praesentium, tempora
            maxime temporibus assumenda quas? Aut natus magni modi, provident a
            magnam ipsam sed dicta doloribus fugiat inventore, aliquid amet
            incidunt itaque sapiente soluta nihil autem voluptatem repudiandae
            illum cum! Dolorum eveniet molestiae soluta placeat.
          </p>
        </div>
        <div className="my-3 pb-5 mt-4">
          <Link
            className="bg-burgundy hover:bg-red-700 font-bold py-2 px-4 rounded-full mb-4"
            to="/cartelera"
          >
            Ver carteleras
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;

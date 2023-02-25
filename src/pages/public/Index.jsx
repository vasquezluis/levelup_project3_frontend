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
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-wrap justify-center">
        {/* Layout */}
        {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p>Earnings</p>
              <p>Hola</p>
            </div>
          </div>
          <div className="mt-6">
            <button>Hola</button>
          </div>
        </div> */}

        {/* new section */}
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <p className="text-3xl font-bold">Peliculas destacadas</p>
        </div>

        {/* new section */}
        <div className="flex m-3 bg-white flex-wrap justify-center gap1 items-center">
          {/* top part */}
          <div className="w-full mx-auto py-10 grid lg:grid-cols-2 gap-5">
            {/* Poster  */}
            <div className="p-5 pl-10 flex">
              <img
                className="w-[50%]"
                src={movieToShow.poster}
                alt={movieToShow.name}
              />
              <div className="flex flex-col pl-10 pt-10 max-w-sm">
                <h2 className=" text-3xl font-bold mb-4">{movieToShow.name}</h2>
                <p className="mb-4 text-justify">
                  Sinopsis: {movieToShow.description.substring(0, 200)}...
                </p>
                <p>
                  Genero:
                  {movieToShow.genders.map((item, index) => {
                    if (item) {
                      return (
                        <span
                          className="bg-gray-200 px-1 mx-1 rounded-md"
                          key={index}
                        >
                          {item}
                        </span>
                      );
                    }
                  })}
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
                <p className="mb-4 text-justify">
                  Sinopsis: {movieToShow2.description.substring(0, 200)}...
                </p>
                <p>
                  Genero:
                  {movieToShow2.genders.map((item, index) => {
                    if (item) {
                      return (
                        <span
                          className="bg-gray-200 px-1 mx-1 rounded-md"
                          key={index}
                        >
                          {item}
                        </span>
                      );
                    }
                  })}
                </p>
              </div>
            </div>
          </div>
          {/* below part */}
          <div className="text-center bg-white">
            <div>
              <p>
                <span className="font-bold">Cines de Guatemala</span> es una
                cadena de cines que te ofrecen las mejores peliculas, los
                mejores estrenos, y las mejores salas de cines del país.
                Descubre la variedad de peliculas disponibles!
              </p>
            </div>
            <div className="my-3 pb-5 mt-4">
              <Link
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mb-4"
                to="/cartelera"
              >
                Ver carteleras
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

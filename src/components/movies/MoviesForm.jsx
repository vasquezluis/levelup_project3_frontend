import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createItem } from "../../api/moviesAPI";
import { createItem as createSeats } from "../../api/seatsAPI";

function MoviesForm() {
  // * client to update data on change
  const queryClient = useQueryClient();

  // * reference to form for clear data fields
  const formRef = useRef();

  // * seats mutation config
  const addSeatMutation = useMutation({
    mutationFn: createSeats,
    onSuccess: () => {
      console.log("seats added");
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });

  //* movie mutation config
  const addMovieMutation = useMutation({
    //? function to use in API
    mutationFn: createItem,
    onSuccess: (data, variables, context) => {
      const movieId = data.data.body._id;
      const movie = data.data.body.name;

      // ? creating seats for movie
      addSeatMutation.mutate({ movieId, movie });

      alert("Movie added");
      queryClient.invalidateQueries("movies"); //? from querykey in productsList.jsx
    },
    onError: () => {
      alert("Error creating movie");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); //? prevent de page reload

    const formData = new FormData(e.target); // ? getting form data
    const movie = Object.fromEntries(formData); // ? creatind product object from formData

    if (movie.gender2 == "") {
      movie.gender2 = null;
    }
    if (movie.gender3 == "") {
      movie.gender3 = null;
    }

    const newMovieData = {
      ...movie,
      genders: [movie.gender1, movie.gender2, movie.gender3],
      schedules: [
        { schedule: movie.schedule1, date: movie.date1, cinema: movie.cinema1 },
        { schedule: movie.schedule2, date: movie.date2, cinema: movie.cinema2 },
        { schedule: movie.schedule3, date: movie.date3, cinema: movie.cinema3 },
      ],
    };

    addMovieMutation.mutate(newMovieData);

    formRef.current.reset(); // * reset data on fields after post data
  };

  return (
    <form className="w-full max-w-lg" ref={formRef} onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Titulo
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            name="name"
            type="text"
            placeholder="Piratas del Caribe"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="costo"
          >
            Costo
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="cost"
            name="cost"
            type="number"
            placeholder="180"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="description"
          >
            Sinopsis
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            name="description"
            type="texto"
            placeholder="El capitán Barbossa le roba el barco al pirata Jack Sparrow..."
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Poster
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="poster"
            name="poster"
            type="text"
            placeholder="https://res.cloudinary.com/dh01roref/image/upload/v1675895691"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Trailer
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="trailer"
            name="trailer"
            type="text"
            placeholder="https://www.youtube.com/embed/azjsS0wxTA8"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="gender1"
          >
            Genero 1
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="gender1"
            name="gender1"
            type="text"
            placeholder="Terror"
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="gender2"
          >
            Genero 2
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="gender2"
            name="gender2"
            type="text"
            placeholder="Ciencia ficcion"
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="gender3"
          >
            Genero 3
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="gender3"
            name="gender3"
            type="text"
            placeholder="Suspenso"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Horario 1
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1"
            id="schedule1"
            name="schedule1"
            type="text"
            placeholder="15:00"
            required
          />
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
            id="date1"
            name="date1"
            type="text"
            placeholder="03/10/2023"
            required
          />
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="cinema1"
            name="cinema1"
            type="text"
            placeholder="A1"
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Horario 2
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1"
            id="schedule2"
            name="schedule2"
            type="text"
            placeholder="17:30"
            required
          />
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
            id="date2"
            name="date2"
            type="text"
            placeholder="03/20/2023"
            required
          />
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="cinema2"
            name="cinema2"
            type="text"
            placeholder="A2"
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Horario 3
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1"
            id="schedule3"
            name="schedule3"
            type="text"
            placeholder="14:00"
            required
          />
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
            id="date3"
            name="date3"
            type="text"
            placeholder="03/25/2023"
            required
          />
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="cinema3"
            name="cinema3"
            type="text"
            placeholder="B1"
            required
          />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6 w-full mt-5">
          <div className="px-3 flex flex-col">
            <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MoviesForm;

import { useQuery, useMutation, QueryClient } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import dateFormat from "dateformat";
import { getItem } from "../../api/moviesAPI";
import { createItem } from "../../api/reservationsAPI";

// useLocation for know the current url
// useParams for params on url

function MoviePage() {
  // TODO movie id from url
  const { id } = useParams();
  // TODO userId from context
  const userId = "63f441955be6f3e55ca082b8";

  // TODO connection to movieAPI
  const {
    isLoading,
    data: movie,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: () => getItem(id),
  });
  // TODO connection to reservationsAPI
  const addReservationMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      alert("Reservacion creada!");
    },
    onError: () => {
      alert("Creditos insuficientes!");
    },
  });

  // TODO seats logic
  const [seats, setSeats] = useState([]);
  const [blockedSeat, setBlockedSeat] = useState([
    "02",
    "03",
    "04",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "15",
    "16",
    "17",
    "22",
    "23",
    "24",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "35",
    "36",
    "37",
    "42",
    "43",
    "44",
    "47",
    "48",
    "49",
  ]);

  const columnas = [...Array(10)];
  const filas = [...Array(5)];

  const selectSeats = (butacaID) => {
    let isSelected = seats.includes(butacaID);
    if (isSelected) {
      setSeats(seats.filter((item) => item !== butacaID));
    } else {
      setSeats([...seats, butacaID]);
    }
  };

  const getTipoButaca = (butacaID) => {
    let isSelected = seats.includes(butacaID);
    let isBlocked = blockedSeat.includes(butacaID);

    if (isSelected) {
      return "bg-green-400 scale-110";
    } else if (isBlocked) {
      return "bg-red-400";
    } else {
      return "";
    }
  };

  // TODO schedules logic
  const [schedule, setSchedule] = useState(null);

  const selectSchedule = (scheduleID) => {
    let isSelected = schedule == scheduleID;

    if (isSelected) {
      setSchedule(null);
    } else {
      setSchedule(scheduleID);
    }
  };

  const getSelectedSchedule = (scheduleID) => {
    let isSelected = scheduleID == schedule;

    if (isSelected) {
      return "bg-green-400 scale-110";
    } else {
      return "";
    }
  };

  // TODO submit function
  const handleSubmit = () => {
    if (seats.length < 1 || schedule == null) {
      alert("No has seleccionado una butaca u horario");
    } else {
      const reservationData = {
        userId,
        movieId: movie._id,
        schedule: schedule,
        seats: seats,
      };

      addReservationMutation.mutate(reservationData);
    }
  };

  // TODO render return
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-wrap justify-center">
        {/* Overview section */}
        <div className="flex flex-nowrap p-5 mt-2 items-center bg-white text-black justify-center">
          {/* poster section */}
          <div className="max-w-lg">
            <img className="w-[80%]" src={movie.poster} alt={movie.name} />
          </div>
          {/* movie data section */}
          <div className="max-w-md">
            <p className="text-3xl font-bold mb-3">{movie.name}</p>
            <p className="text-justify mb-3">{movie.description}</p>
            {movie.genders.map((item, index) => (
              <span key={index} className="bg-gray-300 px-2 rounded-md mr-1">
                {item}
              </span>
            ))}
          </div>
          {/* other section */}
          <div className="w-auto px-10 flex flex-col justify-end">
            <p className="text-3xl font-bold mb-3">Trailer</p>

            {/* Trailer from youtube */}
            <div className="aspect-w-16 aspect-h-9">
              {movie.trailer ? (
                <iframe
                  width="420"
                  height="236"
                  src={`${movie.trailer}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
                ></iframe>
              ) : (
                <p>Trailer no disponible</p>
              )}
            </div>
          </div>
        </div>

        {/* Reservation section */}
        <div className="flex flex-wrap p-5 mt-2 items-center bg-white text-black justify-center mb-5">
          {/* section title */}
          <div className="w-full py-10 flex gap-5 justify-center">
            <p className="text-3xl font-bold">Reserva la pelicula!</p>
          </div>

          {/* seat section */}
          <div className="max-w-lg">
            <div>
              <p className="text-3xl font-bold mb-3">Selecciona una butaca</p>
            </div>

            <div>
              {filas.map((item, index1) => (
                <div key={index1} className="flex flex-row m-1">
                  {columnas.map((item, index2) => (
                    <div
                      key={index2}
                      className={`flex flex-col m-1 rounded w-14 h-14 bg-gray-300 ${getTipoButaca(
                        `${index1}${index2}`
                      )} ${
                        blockedSeat.includes(`${index1}${index2}`)
                          ? ""
                          : "cursor-pointer hover:scale-125 hover:bg-gray-900 hover:text-white"
                      } `}
                      onClick={() => selectSeats(`${index1}${index2}`)}
                    >
                      {`${index1},${index2}`}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* schedule section */}
          <div className="w-auto px-10 flex flex-col justify-end">
            <p className="text-3xl font-bold mb-3">Selecciona un horario</p>

            {movie.schedules.map((item, index) => (
              <div
                key={index}
                className={`rounded p-2 m-1 bg-gray-300 hover:text-white hover:bg-gray-900 hover:scale-110 cursor-pointer duration-75 ${getSelectedSchedule(
                  `${item._id}`
                )}`}
                onClick={() => selectSchedule(`${item._id}`)}
              >
                <p>Costo: {movie.cost} creditos</p>
                <p>Horario: {item.schedule}</p>
                <p>Fecha: {dateFormat(item.date, "mmmm dS, yyyy")}</p>
                <p>Sala: {item.cinema}</p>
              </div>
            ))}
          </div>

          {/* submit section */}
          <div className="w-full py-10 flex gap-5 justify-center">
            <button
              type="button"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mb-4"
              onClick={handleSubmit}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;

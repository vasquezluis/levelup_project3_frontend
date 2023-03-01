import { useQuery, useMutation, QueryClient } from "react-query";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import dateFormat from "dateformat";
import { getItem, getMovieSeats } from "../../api/moviesAPI";
import { createItem } from "../../api/reservationsAPI";
import { updateItem } from "../../api/seatsAPI";

import { useSelector } from "react-redux";

// useLocation for know the current url
// useParams for params on url

function MoviePage() {
  // TODO movie id from url
  const { id } = useParams();
  // TODO userId from context
  const user = useSelector((state) => state.user);
  const userId = user.id;

  const navigate = useNavigate();

  // TODO connection to seatsAPI
  const seatsQuery = useQuery(["seats"], () => getMovieSeats(id), {
    refetchOnWindowFocus: false,
    // enabled: false,
  });
  // TODO connection to movieAPI
  const moviesQuery = useQuery({
    queryKey: ["movie"],
    queryFn: () => getItem(id),
  });
  // TODO connection to reservationsAPI
  const addReservationMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      alert("Reservacion creada!");
      navigate("/userdash");
    },
    onError: () => {
      alert("Creditos insuficientes!");
    },
  });
  // TODO connection to seatsAPI
  const updateSeatsMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      console.log("datos de asientos actualizados");
    },
    onError: () => {
      console.log("error actualizando asientos");
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

  const handleSeats = () => {
    seatsQuery.refetch();
    if (seatsQuery.isFetching) {
      console.log("cargando seats data");
    } else if (seatsQuery.isFetched) {
      setBlockedSeat(seatsQuery.data.occupied);
    } else {
      console.log("sin cargar seats data");
    }
  };

  const [reservedSeats, setReservedSeats] = useState(["00", "01"]);

  const columnas = [...Array(10)];
  const filas = [...Array(5)];

  const selectSeats = (butacaID) => {
    let isBlocked = blockedSeat.includes(butacaID);
    if (!isBlocked) {
      let isSelected = seats.includes(butacaID);
      if (isSelected) {
        setSeats(seats.filter((item) => item !== butacaID));
      } else {
        setSeats([...seats, butacaID]);
      }
    }
  };

  // const selectSeats = (butacaID) => {
  //   let isSelected = seats.includes(butacaID);
  //   if (isSelected) {
  //     setSeats(seats.filter((item) => item !== butacaID));
  //   } else {
  //     setSeats([...seats, butacaID]);
  //   }
  // };

  const getTipoButaca = (butacaID) => {
    let isSelected = seats.includes(butacaID);
    let isBlocked = blockedSeat.includes(butacaID);

    if (isSelected) {
      return "bg-green-400 scale-110";
    } else if (isBlocked) {
      return "bg-red-400 cursor-not-allowed";
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
      handleSeats();
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
        movieId: moviesQuery.data._id,
        schedule: schedule,
        seats: seats,
      };

      if (userId == "") {
        navigate("/login");
      } else {
        const newBlockedSeats = [...seats, ...blockedSeat];
        console.log("new blocked seats: ", newBlockedSeats);
        console.log("reservation: ", reservationData);
        const seatsId = seatsQuery.data._id;
        const body = { occupied: newBlockedSeats };
        updateSeatsMutation.mutate({ seatsId, body });
        addReservationMutation.mutate(reservationData);
      }
    }
  };

  // TODO render return
  if (moviesQuery.isLoading) return <div>Loading movies...</div>;
  if (seatsQuery.isLoading) return <div>Loading seats...</div>;

  if (moviesQuery.isError) return <div>Error: {moviesQuery.error}</div>;
  if (seatsQuery.isError) return <div>Error: {seatsQuery.error}</div>;

  return (
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-wrap justify-center">
        {/* Overview section */}
        <div className="flex flex-nowrap p-5 mt-2 items-center bg-white text-black justify-center">
          {/* poster section */}
          <div className="max-w-lg">
            <img
              className="w-[80%]"
              src={moviesQuery.data.poster}
              alt={moviesQuery.data.name}
            />
          </div>
          {/* movie data section */}
          <div className="max-w-md">
            <p className="text-3xl font-bold mb-3">{moviesQuery.data.name}</p>
            <p className="text-justify mb-3">{moviesQuery.data.description}</p>
            {moviesQuery.data.genders.map((item, index) => {
              if (item) {
                return (
                  <span
                    key={index}
                    className="bg-gray-300 px-2 rounded-md mr-1"
                  >
                    {item}
                  </span>
                );
              }
            })}
          </div>
          {/* other section */}
          <div className="w-auto px-10 flex flex-col justify-end">
            <p className="text-3xl font-bold mb-3">Trailer</p>

            {/* Trailer from youtube */}
            <div className="aspect-w-16 aspect-h-9">
              {moviesQuery.data.trailer ? (
                <iframe
                  width="420"
                  height="236"
                  src={`${moviesQuery.data.trailer}`}
                  title="YouTube video player"
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

          {/* schedule section */}
          <div className="w-auto px-10 flex flex-col justify-end">
            <p className="text-3xl font-bold mb-3">Selecciona un horario</p>

            {moviesQuery.data.schedules.map((item, index) => (
              <div
                key={index}
                className={`rounded p-2 m-1 bg-gray-300 hover:text-white hover:bg-gray-900 hover:scale-110 cursor-pointer duration-75 ${getSelectedSchedule(
                  `${item._id}`
                )}`}
                onClick={() => selectSchedule(`${item._id}`)}
              >
                <p>Costo: {moviesQuery.data.cost} creditos</p>
                <p>Horario: {item.schedule}</p>
                <p>Fecha: {dateFormat(item.date, "mmmm dS, yyyy")}</p>
                <p>Sala: {item.cinema}</p>
              </div>
            ))}
          </div>

          {/* seat section */}
          <div className="max-w-lg">
            <div>
              <p className="text-3xl font-bold mb-3">Selecciona una butaca</p>
            </div>

            {/* select seats sections */}
            <div>
              {filas.map((item, index1) => (
                <div key={index1} className="flex flex-row m-1">
                  {columnas.map((item, index2) => (
                    <div
                      key={index2}
                      className={`flex flex-col justify-center items-center m-1 rounded w-14 h-14 bg-gray-300 cursor-pointer ${getTipoButaca(
                        `${index1}${index2}`
                      )}`}
                      onClick={() => selectSeats(`${index1}${index2}`)}
                    >
                      {`${index1}${index2}`}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* <div>
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
            </div> */}
          </div>

          {/* submit section */}
          <div className="w-full py-10 flex gap-5 justify-center">
            <button
              type="button"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mb-4"
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

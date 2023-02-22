import dateFormat from "dateformat";

function ReservationCard({
  moviePoster,
  movie,
  totalCredits,
  seats,
  schedule,
  date,
  cinema,
}) {
  return (
    <div className="max-w-xs rounded shadow-xl p-2 m-1 bg-gray-50 text-black">
      <div className="flex flex-col items-center">
        <img className="w-28" src={moviePoster} alt={movie} />
      </div>
      <p className="text-xl font-bold mt-1">{movie}</p>
      <p>Total creditos: {totalCredits}</p>
      <p className="max-w-xs">
        Asientos:
        {seats.map((item, index) => (
          <span key={index} className="bg-gray-300 rounded-md px-2 mx-1">
            {item}
          </span>
        ))}
      </p>
      <p>Horario: {schedule}</p>
      <p>Fecha: {dateFormat(date, "shortDate")}</p>
      <p>Sala: {cinema}</p>
    </div>
  );
}

export default ReservationCard;

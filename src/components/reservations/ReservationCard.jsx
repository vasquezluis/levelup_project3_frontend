import dateFormat from "dateformat";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReservationsPDF from "./ReservationsPDF";

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
    <div className="lg:w-44 rounded shadow-xl p-2 m-1 bg-gray-50 text-black">
      <div className="flex flex-col items-center">
        <img className="w-28" src={moviePoster} alt={movie} />
      </div>
      <p className="mt-1">{movie}</p>
      <p className="text-xs">Total creditos: {totalCredits}</p>
      <div className="flex flex-grow-0 w-10">
        <p className="text-xs">Asientos:</p>

        {seats.map((item, index) => (
          <span
            key={index}
            className="bg-gray-300 rounded-md px-1 mx-1 text-xs"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="text-xs font-bold">Horario: {schedule}</p>
      <p className="text-xs font-bold">
        Fecha: {dateFormat(date, "shortDate")}
      </p>
      <p className="text-xs font-bold">Sala: {cinema}</p>
      {/* pdf file */}
      <div>
        <PDFDownloadLink
          document={
            <ReservationsPDF
              image={moviePoster}
              title={movie}
              totalCredits={totalCredits}
              seats={seats}
              schedule={schedule}
              date={date}
              cinema={cinema}
            />
          }
          fileName={`${movie}-bill-${dateFormat(Date.now(), "shortDate")}.pdf`}
        >
          <button className="flex flex-col justify-end bg-gray-800 px-2 py-1 rounded text-white">
            PDF
          </button>
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default ReservationCard;

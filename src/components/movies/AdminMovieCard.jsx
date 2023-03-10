function AdminMovieCard({ name, poster, sinopsis, genders, cost }) {
  return (
    <div className="lg:w-44 rounded shadow-lg p-2 m-1 bg-gray-50 text-black hover:scale-105 hover:text-white hover:bg-gray-900 duration-75 cursor-pointer">
      <div className="flex flex-col items-center">
        <img className="w-28" src={poster} alt={name} />
      </div>
      <div>
        <h3 className="text-[20px] font-bold">{name}</h3>
        <p className="text-[14px] mb-3 ">{sinopsis.substring(0, 75)}...</p>
        <p className="text-[14px] mb-3 ">Costo: {cost} creditos</p>
        {genders.map((item, index) => {
          if (item) {
            return (
              <span className="bg-gray-300 rounded-md px-2 mx-1" key={index}>
                {item}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
}

export default AdminMovieCard;

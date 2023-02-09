function MoviesList({ name, poster, sinopsis, genders, schedules }) {
  return (
    <div className="max-h-fit rounded overflow-hidden shadow-lg p-2 m-1 bg-gray-50 text-black hover:scale-110 hover:bg-gray-900 hover:text-white duration-75 cursor-pointer">
      <div className="flex flex-col items-center">
        <img className="w-28" src={poster} alt={name} />
      </div>
      <h3 className="text-[20px] font-bold">{name}</h3>
      <p className="text-[15px]">{sinopsis}</p>
    </div>
  );
}

export default MoviesList;

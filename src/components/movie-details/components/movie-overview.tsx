type MovieOverview = {
  tagline: string | null;
  overview: string;
  genres: string[];
};

export function MovieOverview({ tagline, overview, genres }: MovieOverview) {
  return (
    <div className="flex flex-col justify-around max-w-104 gap-4">
      <p className="text-[16px] italic">{tagline}</p>
      <div className="card-glass">
        <h2 className="text-[16px] font-bold uppercase ">sinopse</h2>
        <p className="text-[16px]">{overview}</p>
      </div>
      <div className="card-glass w-full md:max-w-max truncate">
        <h3 className="text-[14px] font-bold">Generos</h3>
        <div className="flex flex-wrap w gap-2">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 rounded-md bg-[#C150FF2E]"
            >
              <span className="text-white text-[12px] font-semibold uppercase">{genre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type MovieInfoProps = {
  releaseDate: string;
  runtime: string;
  status: string;
  originalLanguage: string;
};

export function MovieInfo({ originalLanguage, releaseDate, runtime, status }: MovieInfoProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-center gap-4">
        <div className="card-glass flex-1">
          <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">lançamento</h2>
          <p className="text-[14px]">{releaseDate}</p>
        </div>

        <div className="card-glass flex-1">
          <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">duração</h2>
          <p className="text-[14px]">{runtime}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="card-glass flex-1">
          <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">situação</h2>
          <p className="text-[14px]">{status}</p>
        </div>

        <div className="card-glass flex-1">
          <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">idioma</h2>
          <p className="text-[14px]">{originalLanguage}</p>
        </div>
      </div>
    </div>
  );
}

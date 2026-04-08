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
          <h2 className="heading2">lançamento</h2>
          <p className="paragrah">{releaseDate}</p>
        </div>

        <div className="card-glass flex-1">
          <h2 className="heading2">duração</h2>
          <p className="paragrah">{runtime}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="card-glass flex-1">
          <h2 className="heading2">situação</h2>
          <p className="paragrah">{status}</p>
        </div>

        <div className="card-glass flex-1">
          <h2 className="heading2">idioma</h2>
          <p className="paragrah">{originalLanguage}</p>
        </div>
      </div>
    </div>
  );
}

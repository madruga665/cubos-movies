import { RatingIndicator } from '@/components/ui/rating-indicator/rating-indicator';

type RatingInfoProps = {
  certification: string | null;
  voteCount: number;
  voteAverage: number;
  ratingIndicatorSize?: string;
};

export function RatingInfo({
  certification,
  voteAverage,
  voteCount,
  ratingIndicatorSize,
}: RatingInfoProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="card-glass flex-3 truncate">
        <h2 className="heading2">Classificação Indicativa</h2>
        <p className="paragrah">{certification}</p>
      </div>

      <div className="card-glass flex-1">
        <h2 className="heading2 ">votos</h2>
        <p className="paragrah">{voteCount}</p>
      </div>

      <RatingIndicator
        rating={voteAverage}
        className="static translate-x-0 translate-y-0 opacity-100"
        size={ratingIndicatorSize}
      />
    </div>
  );
}

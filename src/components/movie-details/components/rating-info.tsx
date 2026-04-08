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
        <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">
          Classificação Indicativa
        </h2>
        <p className="text-[14px]">{certification}</p>
      </div>

      <div className="card-glass flex-1">
        <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">votos</h2>
        <p className="text-[14px]">{voteCount}</p>
      </div>

      <RatingIndicator
        rating={voteAverage}
        className="static translate-x-0 translate-y-0 opacity-100"
        size={ratingIndicatorSize}
      />
    </div>
  );
}

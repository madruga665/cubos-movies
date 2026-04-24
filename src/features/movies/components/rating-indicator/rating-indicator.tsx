import { cn } from '@/lib/tailwind-merge';

type RatingIndicatorProps = {
  rating: number;
  className?: string;
  size?: string;
};

export function RatingIndicator({ rating, className, size }: RatingIndicatorProps) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rating / 100) * circumference;

  return (
    <div
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
        className,
      )}
    >
      <div className={cn('relative flex items-center justify-center size-24.5 md:size-35', size)}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="6"
            fill="rgba(0,0,0,0.6)"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="var(--rating)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        </svg>

        <div className="relative flex items-baseline text-white">
          <span className="font-montserrat font-bold text-[20px] md:text-[24px] text-rating leading-none">
            {rating}
          </span>
          <span className="font-montserrat font-bold text-[12px] md:text-[14px] leading-none">
            %
          </span>
        </div>
      </div>
    </div>
  );
}

type RatingIndicatorProps = {
  rating: number;
};

export function RatingIndicator({ rating }: RatingIndicatorProps) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rating / 100) * circumference;
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="relative flex items-center justify-center w-[98px] h-[98px] md:w-[140px] md:h-[140px]">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="6"
            fill="rgba(0,0,0,0.6)"
            className="md:r-[64px]"
            // Note: exact radius scaling for mobile vs desktop would need
            // dynamic SVG sizing, keeping simple with one size or CSS scaling
            style={{ r: 'calc(50% - 6px)' }}
          />
          {/* Progress Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#ffe000"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              r: 'calc(50% - 6px)',
              strokeDasharray: '283',
              strokeDashoffset: `${283 - (rating / 100) * 283}`,
            }}
          />
        </svg>
        <div className="relative flex items-baseline text-white">
          <span className="font-montserrat font-bold text-[20px] md:text-[24px] text-[#ffe000] leading-none">
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

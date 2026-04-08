import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RatingIndicator } from '../ui/rating-indicator/rating-indicator';

interface MovieCardProps {
  id: string;
  title: string;
  genres: string;
  voteAvarege: number;
  posterUrl?: string | null;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  genres,
  voteAvarege,
  posterUrl,
}) => {
  return (
    <Link href={`/dashboard/movies/${id}`} className="block">
      <div className="group relative flex flex-col items-center justify-center overflow-clip rounded-sm shrink-0 w-45.75 h-70.25 md:w-58.75 md:h-88.75 cursor-pointer transition-transform hover:scale-[1.02]">
        <div className="absolute inset-0 w-full h-full shadow-[0px_1px_5px_0px_rgba(0,0,0,0.2)]">
          <Image
            src={posterUrl || '/default-poster.webp'}
            alt={`Pôster do filme ${title}`}
            fill
            sizes="(max-width: 768px) 183px, 235px"
            className="object-cover object-center"
          />
        </div>

        {/* Gradient Background for Text */}
        <div className="absolute bottom-0 left-0 w-full h-39.25 md:h-41.5 bg-linear-to-b from-transparent via-[rgba(0,0,0,0.6)] to-black" />

        <RatingIndicator rating={voteAvarege} />

        {/* Titles */}
        <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end items-start gap-2 h-auto">
          <h3 className="font-montserrat font-bold md:font-semibold text-[14px] md:text-[16px] text-white uppercase leading-snug w-full line-clamp-2">
            {title}
          </h3>
          <p className="font-montserrat font-normal text-[12.8px] text-[#b4b4b4] w-full truncate">
            {genres}
          </p>
        </div>
      </div>
    </Link>
  );
};

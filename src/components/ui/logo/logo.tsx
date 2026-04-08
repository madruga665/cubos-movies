import Link from 'next/link';
import React from 'react';

export function Logo() {
  return (
    <Link href={'/dashboard'}>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="w-8 h-8 md:w-9 md:h-9 border-2 border-foreground rounded-sm shrink-0" />

        <div className="hidden md:block">
          <span className="font-inter font-bold text-xl uppercase tracking-wider text-foreground">
            Cubos
          </span>
        </div>

        <span className="font-inter font-bold text-xl text-foreground">Movies</span>
      </div>
    </Link>
  );
}

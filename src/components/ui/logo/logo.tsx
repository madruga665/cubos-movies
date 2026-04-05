import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {/* Icon (Representing the square/cube from the design) */}
      <div className="w-8 h-8 md:w-9 md:h-9 border-2 border-foreground rounded-[4px] flex-shrink-0" />

      {/* "Cubos" Text - Visible only on desktop */}
      <div className="hidden md:block">
        <span className="font-inter font-bold text-xl uppercase tracking-wider text-foreground">
          Cubos
        </span>
      </div>

      {/* "Movies" Text - Always visible */}
      <span className="font-inter font-bold text-xl text-foreground">Movies</span>
    </div>
  );
}

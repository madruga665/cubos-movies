'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/input/checkbox';

interface FilterSectionProps {
  genres: string[];
  selectedGenres: string[];
  onApplyFilters: (selectedGenres: string[]) => void;
  onClearFilters: () => void;
}

export function FilterSection({
  genres,
  selectedGenres: initialSelected,
  onApplyFilters,
  onClearFilters,
}: FilterSectionProps) {
  const [tempSelected, setTempSelected] = useState<string[]>(initialSelected);

  const toggleGenre = (genre: string) => {
    setTempSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="bg-card/60 backdrop-blur-md border border-border-custom rounded-sm p-6 w-full max-w-341.5 mt-2 animate-in slide-in-from-top-4 duration-300">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-montserrat text-foreground">Gêneros</h3>
          <button
            onClick={() => setTempSelected([])}
            className="text-sm text-primary hover:underline font-roboto"
          >
            Limpar seleção
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <Checkbox
              key={genre}
              label={genre}
              checked={tempSelected.includes(genre)}
              onChange={() => toggleGenre(genre)}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={onClearFilters}>
            Cancelar filtros
          </Button>
          <Button onClick={() => onApplyFilters(tempSelected)}>
            Salvar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}

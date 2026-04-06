import React from 'react';
import { Button } from '@/components/ui/button/button';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages || 0 }, (_, index) => index + 1);

  return (
    <div className="flex gap-3 items-center justify-center p-4 md:p-6 w-full">
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        // onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-3 min-w-[44px]"
        aria-label="Página anterior"
      >
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 11L0.5 6L5.5 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'ghost'}
          // onClick={() => onPageChange(page)}
          className={`min-w-[44px] ${currentPage !== page ? 'text-foreground opacity-60 hover:opacity-100 font-bold' : 'font-bold'}`}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="primary" // Active state for next arrow as per design
        disabled={currentPage === totalPages}
        // onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-3 min-w-[44px]"
        aria-label="Próxima página"
      >
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 11L5.5 6L0.5 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};

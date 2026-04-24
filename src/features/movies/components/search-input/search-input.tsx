import React, { forwardRef, useId } from 'react';
import { Spinner } from '@/components/ui/spinner/spinner';

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  loading?: boolean;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ loading, ...props }, ref) => {
    const id = useId();
    return (
      <div className="bg-[#1a191b] light:bg-[#faf9fb] border border-[#49474e] light:border-[#dbd8e0] content-stretch flex h-11 items-center justify-between overflow-clip px-4 relative rounded-sm shrink-0 w-full md:w-122 transition-colors focus-within:border-primary">
        <label htmlFor={id} className="sr-only">
          Pesquise por filmes
        </label>
        <input
          id={id}
          ref={ref}
          type="search"
          placeholder="Pesquise por filmes"
          className="flex-1 h-full bg-transparent outline-none font-roboto font-bold md:font-normal leading-[normal] text-[#6f6d78] light:text-[#8e8c99] text-[16px] placeholder:text-[#6f6d78] light:placeholder:text-[#8e8c99]"
          {...props}
        />
        {loading && <Spinner size="sm" className="text-primary shrink-0 ml-2" />}
        <div className="relative shrink-0 size-6 flex items-center justify-center text-[#6f6d78] light:text-[#8e8c99] pointer-events-none">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

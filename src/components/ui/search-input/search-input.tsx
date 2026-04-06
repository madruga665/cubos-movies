import React, { forwardRef, useId } from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const id = useId();
    return (
      <div className="bg-[#1a191b] light:bg-[#faf9fb] border border-[#49474e] light:border-[#dbd8e0] content-stretch flex h-[44px] items-center justify-between overflow-clip p-[16px] relative rounded-[4px] shrink-0 w-full md:w-[488px] transition-colors focus-within:border-primary">
        <label htmlFor={id} className="sr-only">Pesquise por filmes</label>
        <input
          id={id}
          ref={ref}
          type="search"
          placeholder="Pesquise por filmes"
          className="w-full bg-transparent outline-none font-roboto font-bold md:font-normal leading-[normal] text-[#6f6d78] light:text-[#8e8c99] text-[16px] placeholder:text-[#6f6d78] light:placeholder:text-[#8e8c99]"
          {...props}
        />
        <div className="relative shrink-0 w-[24px] h-[24px] flex items-center justify-center text-[#6f6d78] light:text-[#8e8c99] pointer-events-none">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

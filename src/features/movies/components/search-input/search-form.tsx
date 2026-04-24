'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchInput } from '../search-input/search-input';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useTransition } from 'react';

export const SearchForm = ({ defaultValue }: { defaultValue?: string }) => {
  const [isPending, startTransition] = useTransition();
  const [isTyping, setIsTyping] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    setIsTyping(false);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
      params.set('page', '1');
    } else {
      params.delete('search');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsTyping(true);
    handleSearch(e.target.value);
  }

  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    handleSearch.flush();
  }

  return (
    <form onSubmit={onSubmit} className="w-full md:w-auto">
      <SearchInput
        name="search"
        defaultValue={defaultValue}
        loading={isTyping || isPending}
        onChange={onChange}
      />
    </form>
  );
};

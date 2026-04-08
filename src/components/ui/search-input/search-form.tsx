'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchInput } from '../search-input/search-input';

export const SearchForm = ({ defaultValue }: { defaultValue?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;

    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full md:w-auto">
      <SearchInput name="search" defaultValue={defaultValue} />
    </form>
  );
};

'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchInput } from '../search-input/search-input';

export const SearchForm = ({ defaultValue }: { defaultValue?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;

    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    // Reset to first page when searching
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full md:w-auto">
      <SearchInput name="search" defaultValue={defaultValue} />
    </form>
  );
};

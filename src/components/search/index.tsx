import React from 'react';
import { SearchResultsList } from './list';
import { LoadMoreButton } from './load-more';
import { SearchToolbar } from './toolbar';

export const Search: React.FC = () => {
  return (
    <div>
      <SearchToolbar />
      <SearchResultsList />
      <LoadMoreButton />
    </div>
  );
};

import React from 'react';
import { SearchResultsList } from '../search/list';
import { LoadMoreButton } from '../search/load-more';
import { SearchToolbar } from '../search/toolbar';

export const RootPage: React.FC = () => {
  return (
    <div>
      <SearchToolbar />
      <SearchResultsList />
      <LoadMoreButton />
    </div>
  );
};

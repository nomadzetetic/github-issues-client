import React from 'react';
import { useSearch } from '../../../hooks/use-search';
import classes from './load-more.module.scss';

export const LoadMoreButton: React.FC = () => {
  const { searchCursor, inSearch, search } = useSearch();

  const onLoadMoreClick = () => {
    search(searchCursor);
  };

  return searchCursor ? (
    <div className={classes.container}>
      <button
        type="button"
        data-testid="loadMoreButton"
        disabled={inSearch}
        onClick={onLoadMoreClick}
      >
        Load More
      </button>
    </div>
  ) : null;
};

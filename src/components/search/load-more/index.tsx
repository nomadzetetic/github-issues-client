import React from 'react';
import { useSearch } from '../use-search';
import classes from './load-more.module.scss';

export const LoadMoreButton: React.FC = () => {
  const { searchCursor, busy, search } = useSearch();

  const onLoadMoreClick = () => {
    search(searchCursor);
  };

  return searchCursor ? (
    <div className={classes.container}>
      <button
        type="button"
        data-testid="loadMoreButton"
        disabled={busy}
        onClick={onLoadMoreClick}
      >
        Load More
      </button>
    </div>
  ) : null;
};

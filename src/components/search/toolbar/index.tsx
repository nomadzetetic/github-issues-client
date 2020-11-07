import React from 'react';
import { IssueState } from '../../../graphql';
import { useSearch } from '../../../hooks/use-search';
import classes from './toolbar.module.scss';

export const SearchToolbar: React.FC = () => {
  const { inSearch, search, issueState, searchText, setIssueState, setSearchText } = useSearch();

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueState(e.target.value as IssueState);
  };

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearchButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  return (
    <form onSubmit={onSearchButtonClick} className={classes.toolbar}>
      <div className={classes.filter}>
        <input
          className={classes.filterInput}
          placeholder="Type text to search in issue body"
          type="text"
          data-testid="searchInput"
          disabled={inSearch}
          onChange={onSearchTextChange}
          value={searchText}
        />
      </div>
      <div className={classes.states}>
        <label className={classes.label}>
          Open
          <input
            type="radio"
            name="issueState"
            data-testid="searchIssueStateOpen"
            onChange={onStatusChange}
            value={IssueState.Open}
            disabled={inSearch}
            checked={issueState === IssueState.Open}
          />
        </label>
        <label className={classes.label}>
          Closed
          <input
            type="radio"
            name="issueState"
            onChange={onStatusChange}
            value={IssueState.Closed}
            disabled={inSearch}
            data-testid="searchIssueStateClosed"
            checked={issueState === IssueState.Closed}
          />
        </label>
      </div>
      <div className={classes.buttonContainer}>
        <button type="submit" data-testid="searchButton" disabled={inSearch}>
          Search
        </button>
      </div>
    </form>
  );
};

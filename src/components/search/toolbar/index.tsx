import cn from 'classnames';
import React from 'react';
import { IssueState } from '../../../graphql';
import { useSearch } from '../../hooks/use-search';
import './styles.scss';

export const SearchToolbar: React.FC = () => {
  const { appBusy, search, issueState, searchText, setIssueState, setSearchText } = useSearch();

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueState(e.target.value as IssueState);
  };

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearchButtonClick = () => {
    search();
  };

  return (
    <div className="search-toolbar">
      <div className="search-toolbar-filter">
        <input
          className="search-toolbar-filter-input"
          placeholder="Type text to search in issue body"
          type="text"
          data-testid="searchInput"
          disabled={appBusy}
          onChange={onSearchTextChange}
          value={searchText}
        />
      </div>
      <div className="search-toolbar-states">
        <label className={cn({ active: issueState === IssueState.Open })}>
          Open
          <input
            type="radio"
            name="issueState"
            data-testid="searchIssueStateOpen"
            onChange={onStatusChange}
            value={IssueState.Open}
            disabled={appBusy}
            checked={issueState === IssueState.Open}
          />
        </label>
        <label className={cn({ active: issueState === IssueState.Closed })}>
          Closed
          <input
            type="radio"
            name="issueState"
            onChange={onStatusChange}
            value={IssueState.Closed}
            disabled={appBusy}
            data-testid="searchIssueStateClosed"
            checked={issueState === IssueState.Closed}
          />
        </label>
      </div>
      <div className="search-toolbar-button">
        <button
          type="button"
          data-testid="searchButton"
          disabled={appBusy}
          onClick={onSearchButtonClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};

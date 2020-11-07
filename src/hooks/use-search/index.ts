import { useReactiveVar } from '@apollo/client';
import { IssuesQueryVariables, IssueState, useIssuesLazyQuery } from '../../graphql';
import { inSearchVar, issueStateVar, issuesVar, searchCursorVar, searchTextVar } from '../../state';
import { buildQuery } from './build-query';
import { mapSearchResult } from './map-search-result';

const setInSearch = (newValue: boolean) => {
  inSearchVar(newValue);
};

const setSearchText = (newValue: string) => {
  searchTextVar(newValue);
};

const setIssueState = (newValue: IssueState) => {
  issueStateVar(newValue);
};

export const useSearch = () => {
  const issues = useReactiveVar(issuesVar);
  const inSearch = useReactiveVar(inSearchVar);
  const searchText = useReactiveVar(searchTextVar);
  const issueState = useReactiveVar(issueStateVar);
  const searchCursor = useReactiveVar(searchCursorVar);

  const [searchIssues] = useIssuesLazyQuery({
    onCompleted: (data) => {
      const { issues, cursor } = mapSearchResult(data);
      issuesVar(issuesVar().concat(issues));
      searchCursorVar(cursor);
      inSearchVar(false);
    },
    onError: (error) => {
      console.error(error);
      inSearchVar(false);
    },
  });

  const search = (cursor?: string) => {
    if (!inSearch) {
      setInSearch(true);

      const variables: IssuesQueryVariables = {
        query: buildQuery(issueState, searchText),
      };

      if (!cursor) {
        searchCursorVar('');
        issuesVar([]);
      } else {
        variables.after = cursor;
      }

      searchIssues({ variables });
    }
  };

  return {
    searchCursor,
    issues,
    search,
    inSearch,
    searchText,
    setSearchText,
    issueState,
    setIssueState,
  };
};

import { ApolloError, useReactiveVar } from '@apollo/client';
import { IssuesQuery, IssuesQueryVariables, useIssuesLazyQuery } from '../../../graphql';
import { buildSearchQuery } from './build-search-query';
import { mapSearchResults } from './map-search-results';
import {
  busyVar,
  issuesListVar,
  issueStateVar,
  searchCursorVar,
  searchTextVar,
  setBusy,
  setIssuesList,
  setIssueState,
  setSearchCursor,
  setSearchText,
} from './state';

export const onCompleted = (data: IssuesQuery) => {
  const { issues, cursor } = mapSearchResults(data);
  setIssuesList(issuesListVar().concat(issues));
  setSearchCursor(cursor);
  setBusy(false);
};

export const onError = (error: ApolloError) => {
  console.error(error);
  setBusy(false);
};

export const useSearch = () => {
  const issuesList = useReactiveVar(issuesListVar);
  const busy = useReactiveVar(busyVar);
  const searchText = useReactiveVar(searchTextVar);
  const issueState = useReactiveVar(issueStateVar);
  const searchCursor = useReactiveVar(searchCursorVar);

  const [searchIssues] = useIssuesLazyQuery({
    fetchPolicy: searchCursor ? 'cache-first' : 'cache-and-network',
    onCompleted,
    onError,
  });

  const search = (cursor?: string) => {
    if (!busy) {
      setBusy(true);

      const variables: IssuesQueryVariables = {
        query: buildSearchQuery(issueState, searchText),
      };

      if (!cursor) {
        setSearchCursor('');
        setIssuesList([]);
      } else {
        variables.after = cursor;
      }

      searchIssues({ variables });
    }
  };

  return {
    searchCursor,
    issuesList,
    search,
    busy,
    searchText,
    setSearchText,
    issueState,
    setIssueState,
  };
};

import { useReactiveVar } from '@apollo/client';
import { IssueState } from '../../graphql';
import { appBusyVar, issueStateVar, searchTextVar } from '../../utils/cache';

// "is:issue is:open in:body='test' repo:nomadzetetic/comments"
// "is:open in:body='test' repo:nomadzetetic/comments"

export const useSearch = () => {
  const appBusy = useReactiveVar(appBusyVar);
  const searchText = useReactiveVar(searchTextVar);
  const issueState = useReactiveVar(issueStateVar);

  const setAppBusy = (newValue: boolean) => {
    appBusyVar(newValue);
  };

  const setSearchText = (newValue: string) => {
    searchTextVar(newValue);
  };

  const setIssueState = (newValue: IssueState) => {
    issueStateVar(newValue);
  };

  const search = () => {
    if (!appBusy) {
      setAppBusy(true);
      debugger;
    }
  };

  return {
    search,
    appBusy,
    searchText,
    setSearchText,
    issueState,
    setIssueState,
  };
};

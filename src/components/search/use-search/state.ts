import { makeVar } from '@apollo/client';
import { IssueState } from '../../../graphql';

export type IssueSearchViewModel = {
  id?: string | undefined;
  state?: IssueState | undefined;
  title?: string | undefined;
  bodyText?: string | undefined;
  createdAt?: string | undefined;
  number?: number | undefined;
  author?:
    | {
        avatarUrl?: string | undefined;
        login?: string | undefined;
      }
    | undefined;
};

export const busyVar = makeVar<boolean>(false);
export const setBusy = (newValue: boolean) => {
  busyVar(newValue);
};

const SEARCH_ISSUES_LIST_STORAGE_KEY = 'SEARCH_ISSUES_LIST';

const readIssuesListFromSession = (): Array<IssueSearchViewModel> => {
  const rawValue = window.sessionStorage.getItem(SEARCH_ISSUES_LIST_STORAGE_KEY);
  try {
    const issues = JSON.parse(`${rawValue}`);
    return issues;
  } catch {
    return [];
  }
};

export const issuesListVar = makeVar<Array<IssueSearchViewModel>>(readIssuesListFromSession());
export const setIssuesList = (issues: Array<IssueSearchViewModel>) => {
  window.sessionStorage.setItem(SEARCH_ISSUES_LIST_STORAGE_KEY, JSON.stringify(issues));
  issuesListVar(issues);
};

const SEARCH_ISSUE_STATE_STORAGE_KEY = 'SEARCH_ISSUE_STATE';

const readIssueStateFromSession = (): IssueState => {
  const rawValue = window.sessionStorage.getItem(SEARCH_ISSUE_STATE_STORAGE_KEY);
  return rawValue === IssueState.Closed ? IssueState.Closed : IssueState.Open;
};

export const issueStateVar = makeVar<IssueState>(readIssueStateFromSession());
export const setIssueState = (newState: IssueState) => {
  window.sessionStorage.setItem(SEARCH_ISSUE_STATE_STORAGE_KEY, newState);
  issueStateVar(newState);
};

const SEARCH_TEXT_STORAGE_KEY = 'SEARCH_TEXT';

const readSearchTextFromSession = (): string => {
  const value = window.sessionStorage.getItem(SEARCH_TEXT_STORAGE_KEY);
  return value || '';
};

export const searchTextVar = makeVar<string>(readSearchTextFromSession());
export const setSearchText = (newValue: string) => {
  window.sessionStorage.setItem(SEARCH_TEXT_STORAGE_KEY, newValue);
  searchTextVar(newValue);
};

const SEARCH_CURSOR_STORAGE_KEY = 'SEARCH_CURSOR';

const readSearchCursorFromSession = (): string => {
  const value = window.sessionStorage.getItem(SEARCH_CURSOR_STORAGE_KEY);
  return value || '';
};

export const searchCursorVar = makeVar<string>(readSearchCursorFromSession());
export const setSearchCursor = (newValue: string) => {
  window.sessionStorage.setItem(SEARCH_CURSOR_STORAGE_KEY, newValue);
  searchCursorVar(newValue);
};

import { makeVar } from '@apollo/client';
import { IssueState } from '../graphql';

export type IssueViewModel = {
  id: string;
  state: IssueState;
  title?: string;
  bodyText?: string;
  createdAt: string;
  author: {
    avatarUrl?: string;
    login: string;
  };
};

export const issuesVar = makeVar<Array<IssueViewModel>>([]);
export const searchCursorVar = makeVar<string>('');
export const searchTextVar = makeVar<string>('');
export const inSearchVar = makeVar<boolean>(false);
export const issueStateVar = makeVar<IssueState>(IssueState.Open);

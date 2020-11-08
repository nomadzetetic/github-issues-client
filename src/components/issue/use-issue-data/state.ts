import { makeVar } from '@apollo/client';
import { IssueSearchViewModel } from '../../search/use-search/state';

export type Comment = {
  id: string | undefined;
  bodyText: string | undefined;
  createdAt: string | undefined;
  author: {
    login: string | undefined;
    avatarUrl: string | undefined;
  };
};

export const busyVar = makeVar<boolean>(false);
export const commentsCursorVar = makeVar<string>('');
export const commentsVar = makeVar<Array<Comment>>([]);
export const issueVar = makeVar<IssueSearchViewModel | undefined>(undefined);

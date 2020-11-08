import { IssueQuery } from '../../../graphql';
import { IssueSearchViewModel } from '../../search/use-search/state';

export const mapIssue = (data: IssueQuery): IssueSearchViewModel => {
  return {
    id: data?.repository?.issue?.id.toString(),
    state: data?.repository?.issue?.state,
    author: {
      login: data?.repository?.issue?.author?.login,
      avatarUrl: data?.repository?.issue?.author?.avatarUrl,
    },
    bodyText: data?.repository?.issue?.bodyText,
    title: data?.repository?.issue?.title,
    createdAt: data?.repository?.issue?.createdAt,
    number: data?.repository?.issue?.number,
  };
};

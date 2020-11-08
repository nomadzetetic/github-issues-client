import { IssuesQuery } from '../../../graphql';
import { IssueSearchViewModel } from './state';

export const mapSearchResults = (data: IssuesQuery) => {
  const cursor = data?.search?.pageInfo?.hasNextPage ? data?.search?.pageInfo?.endCursor || '' : '';

  const issues: Array<IssueSearchViewModel> = (
    (data?.search?.nodes as Array<IssueSearchViewModel>) || []
  ).map(({ id, title, author, createdAt, state, bodyText, number }) => ({
    id,
    title,
    author,
    createdAt,
    state,
    number,
    bodyText,
  }));

  return {
    issues,
    cursor,
  };
};

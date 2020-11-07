import { IssuesQuery } from '../../graphql';
import { IssueViewModel } from '../../state';

export const mapSearchResult = (data: IssuesQuery) => {
  const cursor = data?.search?.pageInfo?.hasNextPage ? `${data?.search?.pageInfo?.endCursor}` : '';

  const issues: Array<IssueViewModel> = ((data?.search?.nodes as Array<IssueViewModel>) || []).map(
    ({ id, title, author, createdAt, state, bodyText }) => ({
      id,
      title,
      author,
      createdAt,
      state,
      bodyText,
    })
  );

  return {
    issues,
    cursor,
  };
};

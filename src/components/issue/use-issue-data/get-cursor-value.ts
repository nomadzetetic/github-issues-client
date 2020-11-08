import { IssueQuery } from '../../../graphql';

export const getCursorValue = (data: IssueQuery): string | null | undefined => {
  return data?.repository?.issue?.comments?.pageInfo?.hasNextPage
    ? data?.repository?.issue?.comments?.pageInfo?.endCursor
    : '';
};

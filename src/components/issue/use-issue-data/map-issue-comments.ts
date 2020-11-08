import { IssueQuery } from '../../../graphql';
import { Comment } from './state';

export const mapIssueComments = (data: IssueQuery): Array<Comment> => {
  const comments = data?.repository?.issue?.comments?.nodes?.map((comment) => {
    return {
      id: comment?.id,
      bodyText: comment?.bodyText,
      createdAt: comment?.createdAt,
      author: {
        login: comment?.author?.login,
        avatarUrl: comment?.author?.avatarUrl,
      },
    };
  }) as Array<Comment>;

  return comments;
};

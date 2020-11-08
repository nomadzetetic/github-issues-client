import { useReactiveVar } from '@apollo/client';
import { IssueQueryVariables, useIssueLazyQuery } from '../../../graphql';
import { getCursorValue } from './get-cursor-value';
import { mapIssue } from './map-issue';
import { mapIssueComments } from './map-issue-comments';
import { busyVar, commentsCursorVar, commentsVar, issueVar } from './state';

export const useIssueData = (issueNumber: number) => {
  const busy = useReactiveVar(busyVar);
  const issue = useReactiveVar(issueVar);
  const comments = useReactiveVar(commentsVar);
  const commentsCursor = useReactiveVar(commentsCursorVar);

  const [loadIssueData] = useIssueLazyQuery({
    onCompleted: (data) => {
      if (!issue) {
        issueVar(mapIssue(data));
      }

      const newComments = mapIssueComments(data);
      commentsVar(commentsVar().concat(newComments));

      const cursor = getCursorValue(data);
      commentsCursorVar(cursor || '');

      busyVar(false);
    },
    onError: (error) => {
      console.error(error);
      busyVar(false);
    },
  });

  const load = (cursor?: string) => {
    if (!busy) {
      busyVar(true);

      const variables: IssueQueryVariables = {
        number: issueNumber,
      };

      if (!cursor) {
        issueVar(undefined);
        commentsCursorVar('');
        commentsVar([]);
      } else {
        variables.after = cursor;
      }

      loadIssueData({ variables });
    }
  };

  return {
    load,
    busy,
    issue,
    comments,
    commentsCursor,
  };
};

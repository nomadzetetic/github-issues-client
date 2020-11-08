import React, { useEffect } from 'react';
import classes from './issue.module.scss';
import { useIssueData } from './use-issue-data';

type IssueProps = {
  issueNumber: number;
};

export const Issue = ({ issueNumber }: IssueProps) => {
  const { issue, busy, load, commentsCursor, comments } = useIssueData(issueNumber);

  useEffect(() => {
    load();
  }, []);

  const onLoadMoreClick = () => {
    load(commentsCursor);
  };

  const loaded = issueNumber === issue?.number;

  return (
    <div>
      <h1>
        {loaded && issue?.author?.avatarUrl ? (
          <>
            <img
              className={classes.avatar}
              src={issue?.author?.avatarUrl}
              alt={`${issue?.author?.login}`}
            />{' '}
          </>
        ) : null}
        {loaded ? issue?.title : '...'} ({loaded ? issue?.createdAt : '...'})
      </h1>
      <pre className={classes.text}>{loaded ? issue?.bodyText : '...'}</pre>
      <ul className={classes.comments}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h4>
              {comment.author.login} - {comment.createdAt}
            </h4>
            <p>{comment.bodyText}</p>
          </li>
        ))}
      </ul>
      {comments?.length && commentsCursor ? (
        <div className={classes.loadMoreContainer}>
          <button type="button" disabled={busy} onClick={onLoadMoreClick}>
            Load More Comments
          </button>
        </div>
      ) : null}
    </div>
  );
};

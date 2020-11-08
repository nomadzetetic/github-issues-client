import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../use-search';
import classes from './list.module.scss';

export const SearchResultsList = () => {
  const { issuesList } = useSearch();

  if (!issuesList?.length) {
    return null;
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Created At</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {issuesList.map((issue) => (
          <tr key={issue.id}>
            <td className={classes.cell}>
              {issue?.author?.avatarUrl ? (
                <img
                  className={classes.avatar}
                  src={issue.author.avatarUrl}
                  alt={issue.author.login}
                />
              ) : null}
            </td>
            <td className={classes.cell}>
              <Link to={`/details/${issue.number}`}>{issue.title}</Link>
            </td>
            <td className={classes.cell}>{issue.createdAt}</td>
            <td className={classes.cell}>{issue.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

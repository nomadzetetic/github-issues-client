import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Issue } from '../issue';

export const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const issueNumber = Number(id);

  return (
    <div>
      <Link to={'/'}>{'<'} Go Back</Link>
      <Issue issueNumber={issueNumber} />
    </div>
  );
};

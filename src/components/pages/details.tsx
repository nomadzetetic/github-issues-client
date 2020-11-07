import React from 'react';
import { useParams } from 'react-router-dom';

export const DetailsPage = () => {
  const { id } = useParams<any>();
  return <div>{id}</div>;
};

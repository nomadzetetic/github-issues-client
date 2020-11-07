import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { apolloClient } from '../../utils/apollo-client';

export const App: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </ApolloProvider>
  );
};

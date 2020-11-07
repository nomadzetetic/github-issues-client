import { ApolloClient } from '@apollo/client';
import { cache } from './cache';

export const apolloClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: 'Bearer 71e7e69158d622ead34ae45053b14d6458ed5c12',
  },
  cache,
});

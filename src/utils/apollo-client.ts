import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: 'Bearer',
  },
  cache: new InMemoryCache(),
});

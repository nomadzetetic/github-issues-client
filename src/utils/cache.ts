import { InMemoryCache, makeVar } from '@apollo/client';
import { IssueState } from '../graphql';

export const searchTextVar = makeVar<string>('');
export const appBusyVar = makeVar<boolean>(false);
export const issueStateVar = makeVar<IssueState>(IssueState.Open);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appBusy: {
          read() {
            return appBusyVar();
          },
        },
        searchText: {
          read() {
            return searchTextVar();
          },
        },
        issueState: {
          read() {
            return issueStateVar();
          },
        },
      },
    },
  },
});

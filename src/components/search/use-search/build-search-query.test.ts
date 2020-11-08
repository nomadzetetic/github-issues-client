import { IssueState } from '../../../graphql';
import { buildSearchQuery } from './build-search-query';

test('build query', () => {
  expect(buildSearchQuery(IssueState.Open)).toEqual('is:issue is:open repo:facebook/react');
  expect(buildSearchQuery(IssueState.Closed)).toEqual('is:issue is:closed repo:facebook/react');
  expect(buildSearchQuery(IssueState.Open, 'test')).toEqual(
    'is:issue is:open repo:facebook/react in:body in:title test'
  );
  expect(buildSearchQuery(IssueState.Open, ' ')).toEqual('is:issue is:open repo:facebook/react');
});

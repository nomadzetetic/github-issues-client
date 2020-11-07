import { IssueState } from '../../graphql';
import { buildQuery } from './build-query';

test('build query', () => {
  expect(buildQuery(IssueState.Open)).toEqual('is:issue is:open repo:facebook/react');
  expect(buildQuery(IssueState.Closed)).toEqual('is:issue is:closed repo:facebook/react');
  expect(buildQuery(IssueState.Open, 'test')).toEqual(
    'is:issue is:open repo:facebook/react in:body in:title test'
  );
  expect(buildQuery(IssueState.Open, ' ')).toEqual('is:issue is:open repo:facebook/react');
});

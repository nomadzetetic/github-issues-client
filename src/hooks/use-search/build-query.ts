import { IssueState } from '../../graphql';

export const buildQuery = (state: IssueState, input?: string) => {
  const filters = [
    'is:issue',
    `is:${state === IssueState.Open ? 'open' : 'closed'}`,
    'repo:facebook/react',
  ];

  const searchTerm = input?.trim() || '';
  if (searchTerm) {
    filters.push(`in:body in:title ${searchTerm}`);
  }

  return filters.join(' ');
};

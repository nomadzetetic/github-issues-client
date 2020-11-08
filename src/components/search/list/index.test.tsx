import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import { SearchResultsList } from '.';
import { IssueState } from '../../../graphql';
import { useSearch } from '../use-search';
import { IssueSearchViewModel } from '../use-search/state';

jest.mock('../use-search', () => ({ useSearch: jest.fn() }));

describe('<SearchResultsList />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('render not render results list', () => {
    mocked<any>(useSearch).mockImplementation(() => ({ issuesList: [] }));
    const { asFragment } = render(
      <MemoryRouter>
        <SearchResultsList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchInlineSnapshot('<DocumentFragment />');
  });

  test('render issues list', async () => {
    const issuesList: Array<IssueSearchViewModel> = [
      {
        id: '1',
        author: {
          avatarUrl: '/avatar',
          login: 'user1',
        },
        number: 1,
        createdAt: 'now',
        state: IssueState.Open,
        title: 'title1',
      },
      {
        id: '2',
        author: {
          login: 'user2',
        },
        number: 2,
        createdAt: 'yesterday',
        state: IssueState.Closed,
        title: 'title2',
      },
    ];
    mocked<any>(useSearch).mockImplementation(() => ({ issuesList }));
    const { findByText, container } = render(
      <MemoryRouter>
        <SearchResultsList />
      </MemoryRouter>
    );
    expect(await findByText('title1')).toBeInTheDocument();
    expect(await findByText('title2')).toBeInTheDocument();
    expect(await findByText('now')).toBeInTheDocument();
    expect(await findByText('yesterday')).toBeInTheDocument();
    expect(container.querySelector('[alt="user1"]')).toHaveAttribute('src', '/avatar');
  });
});

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import { LoadMoreButton } from '.';
import { useSearch } from '../use-search';

jest.mock('../use-search', () => ({ useSearch: jest.fn() }));

describe('<LoadMoreButton />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('no cursor value', () => {
    mocked<any>(useSearch).mockImplementation(() => ({
      searchCursor: '',
      busy: false,
      search: jest.fn(),
    }));
    const { asFragment } = render(<LoadMoreButton />);
    expect(asFragment()).toMatchInlineSnapshot('<DocumentFragment />');
  });

  test('busy', () => {
    mocked<any>(useSearch).mockImplementation(() => ({
      searchCursor: 'asoidwqoijd',
      busy: true,
      search: jest.fn(),
    }));

    const { getByTestId } = render(<LoadMoreButton />);
    expect(getByTestId('loadMoreButton')).toBeDisabled();
  });

  test('load more click', () => {
    const search = jest.fn();

    mocked<any>(useSearch).mockImplementation(() => ({
      searchCursor: 'cursorValue',
      busy: false,
      search,
    }));

    const { getByTestId } = render(<LoadMoreButton />);
    const loadMore = getByTestId('loadMoreButton');
    fireEvent.click(loadMore);
    expect(search).toHaveBeenCalledWith('cursorValue');
  });
});

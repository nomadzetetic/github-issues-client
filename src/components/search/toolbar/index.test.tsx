import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import { SearchToolbar } from '.';
import * as graphql from '../../../graphql';

describe('<SearchToolbar />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('search', async () => {
    const searchIssues = jest.fn();
    mocked<any>(jest.spyOn(graphql, 'useIssuesLazyQuery')).mockImplementation(() => [searchIssues]);
    const { getByTestId } = render(<SearchToolbar />);

    const searchInput = getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'test 1' } });
    await waitFor(() => {
      expect(searchInput.getAttribute('value')).toEqual('test 1');
    });

    const searchIssueStateOpen = getByTestId('searchIssueStateOpen');
    expect(searchIssueStateOpen).toBeChecked();

    const searchIssueStateClosed = getByTestId('searchIssueStateClosed');
    fireEvent.click(searchIssueStateClosed, { target: { value: 'CLOSED' } });
    await waitFor(() => {
      expect(searchIssueStateClosed).toBeChecked();
      expect(searchIssueStateOpen).not.toBeChecked();
    });

    const searchButton = getByTestId('searchButton');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchIssueStateClosed).toBeDisabled();
      expect(searchIssueStateOpen).toBeDisabled();
      expect(searchInput).toBeDisabled();
      expect(searchButton).toBeDisabled();
      expect(searchIssues).toHaveBeenCalledWith({
        variables: {
          query: 'is:issue is:closed repo:facebook/react in:body in:title test 1',
        },
      });
    });
  });
});

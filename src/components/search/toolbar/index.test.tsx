import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { SearchToolbar } from '.';


describe('<SearchToolbar />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('search', async () => {
    const { getByTestId } = render(<SearchToolbar />);

    const searchInput = getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'test 1' } });
    await waitFor(() => {
      expect(searchInput.getAttribute('value')).toEqual('test 1');
    });

    const searchIssueStateOpen = getByTestId('searchIssueStateOpen');
    expect(searchIssueStateOpen).toHaveAttribute('checked');

    // const searchRadioClosed = getByTestId('closed');
    // fireEvent.click(searchRadioClosed);
    // await waitFor(() => {
    //   expect(searchRadioClosed).toHaveAttribute('checked');
    // });

    // fireEvent.click()
  });

  // appBusy, search, issueState, searchText, setIssueState, setSearchText
});

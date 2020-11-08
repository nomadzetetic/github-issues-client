import { act, renderHook } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { onCompleted, onError, useSearch } from '.';
import * as graphql from '../../../graphql';
import { getSearchResultsMock } from './map-search-results.test';
import * as state from './state';

describe('useSearch', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    act(() => {
      state.busyVar(false);
    });
  });

  test('run search without cursor', () => {
    const searchIssues = jest.fn();
    const useIssuesLazyQuery = jest.spyOn(graphql, 'useIssuesLazyQuery');
    mocked<any>(useIssuesLazyQuery).mockImplementation(() => [searchIssues]);
    const {
      result: {
        current: { search },
      },
    } = renderHook(() => useSearch());
    act(() => {
      search();
    });
    expect(searchIssues).toHaveBeenCalledWith({
      variables: {
        query: 'is:issue is:open repo:facebook/react',
      },
    });
    expect(useIssuesLazyQuery).toHaveBeenCalledWith({
      fetchPolicy: 'cache-and-network',
      onCompleted: expect.any(Function),
      onError: expect.any(Function),
    });
  });

  test('run search with cursor', () => {
    const searchIssues = jest.fn();
    const useIssuesLazyQuery = jest.spyOn(graphql, 'useIssuesLazyQuery');
    mocked<any>(useIssuesLazyQuery).mockImplementation(() => [searchIssues]);
    const {
      result: {
        current: { search },
      },
    } = renderHook(() => useSearch());
    act(() => {
      state.searchCursorVar('cursor');
      search('cursor');
    });
    expect(searchIssues).toHaveBeenCalledWith({
      variables: {
        after: 'cursor',
        query: 'is:issue is:open repo:facebook/react',
      },
    });
    expect(useIssuesLazyQuery).toHaveBeenCalledWith({
      fetchPolicy: 'cache-first',
      onCompleted: expect.any(Function),
      onError: expect.any(Function),
    });
  });

  test('not run search because busy', () => {
    state.busyVar(true);
    const searchIssues = jest.fn();
    const useIssuesLazyQuery = jest.spyOn(graphql, 'useIssuesLazyQuery');
    mocked<any>(useIssuesLazyQuery).mockImplementation(() => [searchIssues]);
    const {
      result: {
        current: { search },
      },
    } = renderHook(() => useSearch());
    act(() => {
      search();
    });
    expect(searchIssues).not.toHaveBeenCalled();
  });

  test('onCompleted', () => {
    const setBusy = jest.spyOn(state, 'setBusy');
    const setSearchCursor = jest.spyOn(state, 'setSearchCursor');
    const setIssuesList = jest.spyOn(state, 'setIssuesList');

    const data = getSearchResultsMock(true, 'cursor');
    onCompleted(data);

    expect(setBusy).toHaveBeenCalledWith(false);
    expect(setSearchCursor).toHaveBeenCalledWith('cursor');
    expect(setIssuesList).toHaveBeenCalledWith(data.search.nodes);
  });

  test('onError', () => {
    const setBusy = jest.spyOn(state, 'setBusy');
    const consoleErrorSpy = jest.spyOn(console, 'error');

    consoleErrorSpy.mockImplementation(() => {}); // prevent console output during test

    const error: any = 'error';
    onError(error);

    expect(setBusy).toHaveBeenCalledWith(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });
});

import { mapSearchResult } from './map-search-result';

const data: any = {
  search: {
    nodes: [
      {
        id: 'MDU6SXNzdWUzNzMzMDYxODQ=',
        title: 'Error line number in Error Boundary',
        bodyText:
          "Hey,\nAs I can not reopen issue #13790, I opened this.\nIf you don't like to fix/add my request, simply say won't fox, but don't close the issue with simple/not related answer, as @aweary did. React is pro library, you are pro, so act like pros.\nThanks.",
        state: 'OPEN',
        createdAt: '2018-10-24T05:03:58Z',
        author: {
          login: 'dehghani-mehdi',
          avatarUrl:
            'https://avatars3.githubusercontent.com/u/9152330?u=06474c109839c3424e7865cd30c606de120b8a86&v=4',
        },
      },
      {
        id: 'MDU6SXNzdWU2NDM1MDYzMDI=',
        title:
          'Bug: I want to confirm why the parameter of currentTime is missing in Line 68 of schedule.js source code.',
        bodyText:
          'React@16.13.1 source code\nParameter of currentTime is necessary for the function of handleTimeout. However, this parameter is not inputted under compatibility conditions.\n requestHostTimeout = function (cb, ms) {\n    _timeoutID = setTimeout(cb, ms);\n  };\n\nrequestHostTimeout(handleTimeout, startTime - currentTime);\n\nfunction handleTimeout(currentTime) {\n  isHostTimeoutScheduled = false;\n  advanceTimers(currentTime);\n\n  if (!isHostCallbackScheduled) {\n    if (peek(taskQueue) !== null) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    } else {\n      var firstTimer = peek(timerQueue);\n\n      if (firstTimer !== null) {\n        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n      }\n    }\n  }\n}',
        state: 'OPEN',
        createdAt: '2020-06-23T03:43:01Z',
        author: {
          login: 'ABCDdouyaer',
          avatarUrl:
            'https://avatars0.githubusercontent.com/u/31639964?u=e8580b0058fa774fadcd1618c1ad0849141dba8a&v=4',
        },
      },
    ],
    issueCount: 24,
    pageInfo: { hasNextPage: true, endCursor: 'Y3Vyc29yOjEw' },
  },
};

test('map search result with cursor', () => {
  expect(mapSearchResult(data)).toEqual({
    cursor: 'Y3Vyc29yOjEw',
    issues: data.search.nodes,
  });
});

test('map search results without cursor', () => {
  data.search.pageInfo.hasNextPage = false;
  expect(mapSearchResult(data)).toEqual({
    cursor: '',
    issues: data.search.nodes,
  });
});

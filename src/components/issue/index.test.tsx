import { MockedProvider } from '@apollo/react-testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Issue } from '.';
import { IssueDocument } from '../../graphql';

let counter = 0;

const generateComments = (commentsCount: number) => {
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      id: `MDEyOklzc3VlQ29tbWVudDcyMzQ1MTQ4NA==${counter}`,
      bodyText:
        "I don't understand this issue. Why does a minified build prevent you from using the browser's profiling tools?",
      createdAt: '2020-11-07T14:15:48Z',
      author: {
        login: 'bvaughn',
        avatarUrl:
          'https://avatars0.githubusercontent.com/u/29597?u=554447abec36b3c4f8cf21f754e3b200ad383f24&v=4',
        __typename: 'User',
      },
      __typename: 'IssueComment',
    });
    counter++;
  }
  return comments;
};

const generateResult = (hasNextPage: boolean, endCursor: string, commentsCount = 10): any => ({
  repository: {
    id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
    issue: {
      id: 'MDU6SXNzdWU3MzgwNDQ2OTg=',
      title: "Distribute source maps for easier debugging in Chrome's Performance tab",
      bodyText:
        "I want to propose the addition of a new file in the react-dom npm package called react-dom.production.js — a non-minified version of react-dom production build.\nEdit: After some discussion(see below) it seems that distributing source maps makes more sense. The points below apply for source maps as well.\nWhy?\nThere are a few ways to profile React's performance — none of them provide a low-level view of what's happening. I believe the best way to profile React is using Chrome's Performance tab using a non-minified production build. Here's why:\n\nFamiliar. People use the Performance tab for every other performance profiling so they are familiar with how to use it.\nPowerful. The Performance tab is extremely powerful. Years of engineering have been put into developing it.\nBetter understanding. When using the React DevTools profiler I have a common problem – I see a component being rendered slowly but I don't know what is causing it. In order to understand I need a more low-level view. Here are some questions that can be answered only with the Chrome Performance tab:\n\nWhat's the balance between the app's code and React execution times? Should I implement some frequently updated components using custom non-React implementation?\nWhat time is spend on setting attribute values, setting innerHTML and adding and removing listeners?\nWhat time is spent on disposing effects? Is there a specific dispose function that is taking more than usual?\nWhat time is spent on mounting effects? Is there a specific effect mount that is taking more than usual?\n\n\n\nDisadvantages\nAs with every solution, there are some drawbacks to using this approach:\n\nDocumentation needed. In order to make sense of what's happening you will need some knowledge of the core functions in React. A little guide with the names of the functions for mount/unmount, effects, and DOM manipulations will be useful. This of course can be done by the community(you are already linking to some community posts in React's documentation).\nRequires more skill. This isn't for everybody. It's aimed at more experienced developers. This type of profiling is a lot more overwhelming than the current approach.\nMay not fit your principles. Maybe it's not part of your principles to introduce and promote such a complicated solution. Maybe you are more interested in searching for a more elegant and minimal solution.",
      state: 'OPEN',
      createdAt: '2020-11-06T21:10:50Z',
      number: 20186,
      author: {
        login: 'astoilkov',
        avatarUrl:
          'https://avatars3.githubusercontent.com/u/884810?u=5b57c60c720616a1ecf7bfe9390b7f37acf638ea&v=4',
        __typename: 'User',
      },
      comments: {
        nodes: generateComments(commentsCount),
        pageInfo: {
          endCursor,
          hasNextPage,
          __typename: 'PageInfo',
        },
        __typename: 'IssueCommentConnection',
      },
      __typename: 'Issue',
    },
    __typename: 'Repository',
  },
});

describe('<Issue />', () => {
  test('execute load on mount', async () => {
    const { container, getByText } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: IssueDocument,
              variables: {
                number: 20186,
              },
            },
            result: {
              data: generateResult(true, 'Y3Vyc29yOnYyOpHOKx9nAA=='),
            },
          },
        ]}
        addTypename={false}
      >
        <Issue issueNumber={20186} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('li')).toHaveLength(10);
      expect(getByText('Load More Comments')).toBeInTheDocument();
    });
  });

  test('load more comments', async () => {
    const { container, getByText } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: IssueDocument,
              variables: {
                number: 20186,
              },
            },
            result: {
              data: generateResult(true, 'Y3Vyc29yOnYyOpHOKx9nAA=='),
            },
          },
          {
            request: {
              query: IssueDocument,
              variables: {
                number: 20186,
                after: 'Y3Vyc29yOnYyOpHOKx9nAA==',
              },
            },
            result: {
              data: generateResult(false, '', 5),
            },
          },
        ]}
        addTypename={false}
      >
        <Issue issueNumber={20186} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('li')).toHaveLength(10);
      expect(getByText('Load More Comments')).toBeInTheDocument();
    });

    const loadMoreButton = getByText('Load More Comments');
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(container.querySelectorAll('li')).toHaveLength(15);
    });
  });

  test('apollo error', async () => {
    const error = new Error('oops...');
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: IssueDocument,
              variables: {
                number: 20186,
              },
            },
            error,
          },
        ]}
        addTypename={false}
      >
        <Issue issueNumber={20186} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(error);
    });
  });
});

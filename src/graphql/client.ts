import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';

import fragmentMatcher from './generated/fragment-matcher.json';
import { authLink } from './links/auth.link';
import { unauthorizedErrorLink } from './links/unauthorized.link';
import { typePolicies } from './typePolicies';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_ENDPOINT,
  fetch,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies,
    possibleTypes: fragmentMatcher.possibleTypes,
  }),
  link: from([authLink, unauthorizedErrorLink, httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

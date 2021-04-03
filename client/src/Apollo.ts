import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import appSyncConfig from 'aws-exports';

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const link = ApolloLink.from([
  createHttpLink({ uri: url }),
]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
} as any);

export default client;

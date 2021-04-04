import { ApolloLink } from 'apollo-link';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import { AUTH_TYPE } from 'aws-appsync';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import appSyncConfig from 'aws-exports';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure(appSyncConfig);

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;
const auth = {
  type: appSyncConfig.aws_appsync_authenticationType as AUTH_TYPE,
  jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth } as any) as any,
  createHttpLink({ uri: url }),
]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
} as any);

export default client;

import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import Amplify, { Auth } from 'aws-amplify';
import { AUTH_TYPE } from 'aws-appsync';
import { createAuthLink } from 'aws-appsync-auth-link';
import appSyncConfig, { apiKey } from 'aws-exports';

import { ApolloClient, InMemoryCache } from '@apollo/client';

Amplify.configure(appSyncConfig);

const url = appSyncConfig.aws_appsync_graphqlEndpoint as string;
const region = appSyncConfig.aws_appsync_region as string;
const authenticationType = ['AMAZON_COGNITO_USER_POOLS', 'API_KEY'];

const apiAuthLink = createAuthLink({
  url,
  region,
  auth: {
    type: authenticationType[1] as AUTH_TYPE.API_KEY,
    apiKey,
  },
}) as any;

const tokenAuthLink = createAuthLink({
  url,
  region,
  auth: {
    type: authenticationType[0] as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
}) as any;

const awsLink = ApolloLink.split(
  (operation) => {
    const publicOperations = ['ListUser', 'ListTeamDashboard', 'ListNotice'];
    return publicOperations.includes(operation.operationName);
  },
  apiAuthLink,
  tokenAuthLink,
);

const link = ApolloLink.from([awsLink, createHttpLink({ uri: url })]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
} as any);

export default client;

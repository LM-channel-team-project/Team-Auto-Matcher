/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

export const apiKey = process.env.REACT_APP_AWS_APIKEY ?? '';

const awsmobile = {
  aws_appsync_region: 'ap-northeast-2',
  aws_project_region: 'ap-northeast-2',
  aws_cognito_region: 'ap-northeast-2',
  aws_cognito_identity_pool_id:
    process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id:
    process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.REACT_APP_AWS_AUTH_DOMAIN,
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: process.env.REACT_APP_AWS_REDIRECT_SIGNIN_URL,
    redirectSignOut: process.env.REACT_APP_AWS_REDIRECT_SIGNOUT_URL,
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_appsync_graphqlEndpoint:
    process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};

export default awsmobile;

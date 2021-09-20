import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalThemeProvider from 'style/GlobalThemeProvider';
import NoticeAddForm from '.';

const props = {
  onCloseModal: () => console.log('close'),
};

export default {
  title: 'Organisms/DetailModal/NoticeAddForm',
  component: NoticeAddForm,
  decorators: [
    (story: Function) => (
      <ApolloProvider
        client={
          new ApolloClient({ link: undefined, cache: new InMemoryCache() })
        }
      >
        {story()}
      </ApolloProvider>
    ),
  ],
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <NoticeAddForm {...props} />
    </GlobalThemeProvider>
  );
}

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import TeamAddForm from '.';

const props = {
  data: {
    id: 'aaaaa',
    name: '라바마',
    people: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
    skills: ['React', 'MongoDB', 'GraphQL', 'Apollo'],
    outline: '한줄 소개 입니다.',
    state: '',
    contents: [
      {
        title: '구현하고자 하는 것',
        text: '출시를 목적으로 하는 앱을 개발하려 합니다',
      },
      {
        title: '진행 상황',
        text: '아이디어를 내고 있는 중입니다.',
      },
      {
        title: '스크롤 테스트',
        text: `Ullamcorper convallis ante dignissim magna mi eleifend vestibulum elementum id nullam sem, 
        ad per pretium lobortis sagittis fames porta odio iaculis. Rutrum porta nostra imperdiet potenti curae suscipit primis per platea lacus maecenas magnis, 
        fames himenaeos nisi elementum condimentum proin posuere rhoncus fusce aenean. Convallis nascetur aptent fames volutpat lectus senectus leo elementum, purus tellus litora congue consequat tincidunt nostra maecenas, posuere feugiat nulla tempor habitant suspendisse ante. Bibendum fames phasellus parturient montes lectus sagittis, 
        vulputate quisque facilisis lorem aenean felis nullam, sodales habitant nunc tempor etiam. Lacus imperdiet tellus commodo molestie luctus vitae euismod ad est cubilia lacinia sagittis, suscipit eleifend aliquet ornare fringilla consequat ridiculus sem justo conubia.`,
      },
    ],
    owner: 'something',
    mail: ['sth'],
  },
  onCloseModal: () => alert('close'),
  onClickUpdate: () => alert('update'),
};

export default {
  title: 'Organisms/DetailModal/TeamAddForm',
  component: TeamAddForm,
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
      <TeamAddForm {...props} />
    </GlobalThemeProvider>
  );
}

import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import MailDetailModal from '.';

const props = {
  data: {
    id: 'bbbbb',
    name: '테스트계정',
    outline: '열심히 하겠습니다',
    devExp: '1년',
    field: 'Backend',
    skills: ['React', 'MongoDB', 'Express'],
    team: ['팀 구하는중'],
    contents: [
      { title: '자기소개', text: '재밌게 하겠습니다..' },
      { title: '하고싶은 말', text: '재밌게 합시다..' },
      {
        title: '스크롤 테스트',
        text: `Ullamcorper convallis ante dignissim magna mi eleifend vestibulum elementum id nullam sem, 
        ad per pretium lobortis sagittis fames porta odio iaculis. Rutrum porta nostra imperdiet potenti curae suscipit primis per platea lacus maecenas magnis, 
        fames himenaeos nisi elementum condimentum proin posuere rhoncus fusce aenean. Convallis nascetur aptent fames volutpat lectus senectus leo elementum, purus tellus litora congue consequat tincidunt nostra maecenas, posuere feugiat nulla tempor habitant suspendisse ante. Bibendum fames phasellus parturient montes lectus sagittis, 
        vulputate quisque facilisis lorem aenean felis nullam, sodales habitant nunc tempor etiam. Lacus imperdiet tellus commodo molestie luctus vitae euismod ad est cubilia lacinia sagittis, suscipit eleifend aliquet ornare fringilla consequat ridiculus sem justo conubia.`,
      },
    ],
  },
  onCloseModal: () => alert('close'),
};

export default {
  title: 'Organisms/DetailModal/Mail',
  component: MailDetailModal,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <MailDetailModal {...props} />
    </GlobalThemeProvider>
  );
}

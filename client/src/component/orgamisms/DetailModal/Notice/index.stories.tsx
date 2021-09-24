import React from 'react';

import GlobalThemeProvider from 'style/GlobalThemeProvider';
import NoticeDetailModal from '.';

const props = {
  data: {
    id: 'test',
    date: new Date(),
    title: 'test title',
    contents: 'test contents',
  },
  isAdmin: true,
  onCloseModal: () => console.log('close'),
};

export default {
  title: 'Organisms/DetailModal/Notice',
  component: NoticeDetailModal,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <NoticeDetailModal {...props} />
    </GlobalThemeProvider>
  );
}

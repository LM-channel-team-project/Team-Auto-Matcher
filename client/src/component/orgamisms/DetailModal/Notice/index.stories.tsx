import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import NoticeDetailModal from '.';

const props = {
  data: {
    id: 'test',
    date: '1995-02-13',
    title: 'test title',
    contents: 'test contents',
  },
  isAdmin: true,
  onCloseModal: () => alert('close'),
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

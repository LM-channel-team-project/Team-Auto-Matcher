import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import MailDetailModal from '.';

const props = {
  data: {
    from: 'bbbbb',
    teamId: '13281491-12301',
    teamName: 'hello',
    type: 'invite',
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

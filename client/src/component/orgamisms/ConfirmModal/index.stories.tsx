import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import ConfirmModal from '.';

export default {
  title: 'Organisms/ConfirmModal',
  component: ConfirmModal,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <ConfirmModal title="내용을 저장 하시겠습니까 ?" />
    </GlobalThemeProvider>
  );
}

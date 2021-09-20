import React from 'react';

import GlobalThemeProvider from 'style/GlobalThemeProvider';
import DetailContent from '.';

const contents = {
  text:
    '출시를 목적으로 하는 앱을 개발하려고 합니다. 지금까지 나온 주제로는 A, B 가 있는데 다른 의견이 있으면 제안해 주시면 됩니다. ',
};

export default {
  title: 'Molecules/DetailContent',
  component: DetailContent,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <DetailContent title="자기소개">{contents.text}</DetailContent>
    </GlobalThemeProvider>
  );
}

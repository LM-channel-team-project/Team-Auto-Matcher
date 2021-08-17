import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import DirectionNav from '.';

export default {
  title: 'Molecules/DirectionNav',
  component: DirectionNav,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <DirectionNav
        leftOnClick={() => alert('leftonclick')}
        rightOnClick={() => alert('rightonclick')}
      />
    </GlobalThemeProvider>
  );
}

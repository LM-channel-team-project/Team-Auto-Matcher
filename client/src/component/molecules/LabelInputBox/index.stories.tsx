import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import { skillsLabel } from 'style/preset';
import LabelInputBox from '.';

const props = {
  list: ['React', 'MongoDB', 'Express'],
  colors: skillsLabel,
  removeLabel: () => console.log('remove'),
};

export default {
  title: 'Molecules/LabelInputBox',
  component: LabelInputBox,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <LabelInputBox {...props} />
    </GlobalThemeProvider>
  );
}

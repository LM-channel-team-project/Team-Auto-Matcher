import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import { skillsLabel } from 'style/preset';
import LabelInputBox, { Props } from '.';

const props = {
  list: ['React', 'MongoDB', 'Express'],
  colors: skillsLabel,
  removeLabel: () => console.log('remove'),
};

export default {
  title: 'Organisms/LabelInputBox',
  component: LabelInputBox,
  args: props,
};

const Templete = (args: Props) => (
  <GlobalThemeProvider>
    <LabelInputBox {...args} />
  </GlobalThemeProvider>
);

export const Default = (args: Props) => Templete(args);

export const Completor = (args: Props) => Templete(args);
Completor.args = {
  completor: {
    items: [
      { text: 'React', color: 'blue' },
      { text: 'React Native', color: 'blue' },
      { text: 'Redux', color: 'purple' },
      { text: 'Express', color: 'green' },
      { text: 'Firebase', color: 'orange' },
    ],
  },
};

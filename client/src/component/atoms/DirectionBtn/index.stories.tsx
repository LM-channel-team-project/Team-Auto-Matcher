import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import { Story, Meta } from '@storybook/react';
import DirectionBtn, { EDirection, IDirectionBtn } from '.';

export default {
  title: 'Atoms/DirectionBtn',
  component: DirectionBtn,
  args: {
    direction: EDirection.BACK,
  },
} as Meta;

export const Template: Story<IDirectionBtn> = (args) => (
  <GlobalThemeProvider>
    <DirectionBtn {...args} />
  </GlobalThemeProvider>
);

export const Primary = Template.bind({});

Primary.args = {
  direction: EDirection.BACK,
};

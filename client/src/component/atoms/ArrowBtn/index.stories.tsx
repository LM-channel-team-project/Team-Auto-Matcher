import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import { Story, Meta } from '@storybook/react';
import ArrowBtn, { arrowDirection, IArrowBtn } from '.';

export default {
  title: 'Atoms/ArrowBtn',
  component: ArrowBtn,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  args: {
    direction: arrowDirection.LEFT,
  },
} as Meta;

export const Template: Story<IArrowBtn> = (args) => (
  <GlobalThemeProvider>
    <ArrowBtn {...args} />
  </GlobalThemeProvider>
);

export const Primary = Template.bind({});

Primary.args = {
  direction: arrowDirection.LEFT,
};

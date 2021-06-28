import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import theme from 'style/theme';
import ColorCircle, { Props } from '.';

export default {
  title: 'Atoms/ColorCircle',
  Component: ColorCircle,
};

const Template = (args: Props) => (
  <GlobalThemeProvider>
    <ColorCircle {...args} />
  </GlobalThemeProvider>
);

export const Sizes = (args: Props) => (
  <>
    <Template size="small" {...args} />
    <Template size="medium" {...args} />
    <Template size="large" {...args} />
  </>
);

export const Colors = (args: Props) => {
  const colors = Object.keys(theme.color.label) as [keyof typeof theme.color.label];
  return (
    <>
      {colors.map((color) => <Template color={color} {...args} />)}
    </>
  );
};

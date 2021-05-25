import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import TextLabel, { ITextLabel } from '.';

export default {
  title: 'Atoms/TextLabel',
  component: TextLabel,
};

const Template = (args: ITextLabel) => (
  <GlobalThemeProvider>
    <TextLabel {...args} />
  </GlobalThemeProvider>
);

export const Colors = () => (
  <div>
    <Template text="Default" />
    <Template text="Yellow" color='yellow' />
    <Template text="Red" color='red' />
    <Template text="Blue" color='blue' />
    <Template text="Orange" color='orange' />
  </div>
);

export const Outline = () => (
  <div>
    <Template outline text="Default" />
    <Template outline text="Yellow" color='yellow' />
    <Template outline text="Red" color='red' />
    <Template outline text="Blue" color='blue' />
    <Template outline text="Orange" color='orange' />
  </div>
);

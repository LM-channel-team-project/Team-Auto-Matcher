import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import AutoCompleteItem, { Props } from '.';

export default {
  title: 'Molecules/AutoCompleteItem',
  Component: AutoCompleteItem,
};

const Templete = (args: Props) => (
  <GlobalThemeProvider>
    <AutoCompleteItem {...args} />
  </GlobalThemeProvider>
);

export const Divider = (args: Props) => (
  <div style={{ width: '5rem' }}>
    <Templete {...args} size="small" text="Small" divider={true} />
    <Templete {...args} size="small" text="Small" divider={true} />
  </div>
);

export const Sizes = (args: Props) => (
  <>
    <Templete {...args} size="small" text="Small" />
    <Templete {...args} size="medium" text="Medium" />
    <Templete {...args} size="large" text="Large" />
  </>
);

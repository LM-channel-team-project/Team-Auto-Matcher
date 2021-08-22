import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import AutoCompleteList from '.';

export default {
  title: 'Organisms/AutoCompleteList',
  component: AutoCompleteList,
  args: {
    items: [
      { text: 'item1', color: 'darkRed' },
      { text: 'item2', color: 'blue' },
      { text: 'item3', color: 'orange' },
      { text: 'item4' },
    ],
    divider: true,
    dividerColor: 'darkMainColor',
    onClick: (event: React.MouseEvent<HTMLDivElement>) =>
      alert(event.currentTarget.querySelector('span')!.textContent),
  },
};

const Templete = (args: any) => (
  <GlobalThemeProvider>
    <AutoCompleteList {...args} />
  </GlobalThemeProvider>
);

export const Default = (args: any) => <Templete {...args} />;

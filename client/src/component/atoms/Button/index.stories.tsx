import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Button, { Props } from './index';

export default {
  title: 'Atoms/Button',
  component: Button,
};

const Template = (args: Props) => (
  <GlobalThemeProvider>
    <Button {...args} />
  </GlobalThemeProvider>
);

export const Sizes = (props: Props) => {
  const args = { onClick: (e: MouseEvent) => alert((e.target as HTMLElement)!.innerText) };

  return (
    <div>
      <Template size='large' {...args} {...props} />
      <Template size='medium' {...args} {...props} />
      <Template size='small' {...args} {...props} />
    </div>
  );
};

export const AllButtons = () => (
  <div style={{ margin: '2em' }}>
    <Sizes children="Transparent"/>
    <Sizes color='gray' children="Gray"/>
    <Sizes color='red' children="Red"/>
    <Sizes color='blue' children="Blue"/>
    <Sizes color='yellow' children="Yellow"/>
    <Sizes color='orange' children="Orange"/>
  </div>
);

import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import CommentInputBox, { Props } from '.';

const props = {
  list: [{
    date: new Date(),
    owner: 'testowner',
    comment: 'testcomment',
    name: 'testname',
  }],
  removeLabel: () => console.log('remove'),
};

export default {
  title: 'Organisms/CommentInputBox',
  component: CommentInputBox,
  args: props,
};

const Templete = (args: Props) => (
  <GlobalThemeProvider>
    <CommentInputBox {...args} />
  </GlobalThemeProvider>
);

export const Default = (args: Props) => Templete(args);

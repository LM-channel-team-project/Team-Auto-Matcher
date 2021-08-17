import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import GitHubIdInput from '.';

export default {
  title: 'Organisms/GitHubIdInput',
  component: GitHubIdInput,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <GitHubIdInput />
    </GlobalThemeProvider>
  );
}

import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import PersonalDetailModal from '.';

const props = {
  data: {
    id: 'test',
    haveTeam: false,
    surveyCompleted: false,
    question: [
      {
        title: 'test',
        answers: ['test'],
      },
    ],
    personState: 'test',
    teamList: [
      {
        id: 'test',
        name: 'test',
      },
    ],
    mail: [
      {
        teamId: 'test',
        teamName: 'test',
        from: 'test',
        type: 'test',
      },
    ],
  },
  onCloseModal: () => alert('close'),
};

export default {
  title: 'Organisms/DetailModal/Personal',
  component: PersonalDetailModal,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <PersonalDetailModal {...props} />
    </GlobalThemeProvider>
  );
}

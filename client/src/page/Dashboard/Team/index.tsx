import React, { useState } from 'react';
import { listTeamDashboard } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import * as Personal from 'page/Dashboard/Personal/style';
import BaseTemplate from 'page/BaseTemplate';
import TeamDetailModal, { TeamModalProps } from 'component/orgamisms/DetailModal/Team';
import TeamAddForm from 'component/orgamisms/DetailModal/TeamAddForm';
import * as Team from './style';

type ExtractType<O, K> = K extends keyof O ? O[K] : never;
type TeamData = ExtractType<TeamModalProps, 'data'>;

interface ModalState {
  type?: 'detail' | 'add';
  data?: TeamData;
}

const TeamDashboardPage = ({ className }: any) => {
  const [modal, setModal] = useState<ModalState>({});

  const {
    loading, error, data, refetch,
  } = useQuery(
    gql`
      ${listTeamDashboard}
    `,
  );

  if (loading) {
    return <></>;
  }

  const { items } = data.listTeamDashboard;

  const teams = items.map((team: any) => {
    const skills = team.skills.map((skill: string) => (
      <Personal.Stacklist key={skill}>{skill}</Personal.Stacklist>
    ));

    const contents = team.contents.map((content: any) => (
      <Team.Text key={content.title}>
        <Team.Title>{content.title}</Team.Title>
        <Team.ContentInfo>{content.text}</Team.ContentInfo>
      </Team.Text>
    ));

    return (
      <Team.List key={team.name} onClick={() => setModal({ type: 'detail', data: team })}>
        <Team.Left>
          <Team.Name>{team.name}</Team.Name>
          <Personal.Stack>{skills}</Personal.Stack>
          <Team.Content>{contents}</Team.Content>
        </Team.Left>
        <Team.State state={team.state}>{team.state}</Team.State>
      </Team.List>
    );
  });

  const renderModal = () => {
    const onCloseModal = () => setModal({});
    const onTeamAdd = () => {
      refetch();
      setModal({});
    };

    switch (modal?.type) {
    case 'detail':
      return <TeamDetailModal data={modal.data} onCloseModal={onCloseModal} />;
    case 'add':
      return <TeamAddForm data={modal.data} onCloseModal={onCloseModal} onAdd={onTeamAdd}/>;
    default:
      return '';
    }
  };

  return (
    <BaseTemplate Modal={renderModal()} closeModal={() => setModal({})}>
      <Personal.Container className={className}>
        <Personal.Top>
          <Personal.MainBtn>메인 메뉴</Personal.MainBtn>
          <Team.Main>팀 현황판</Team.Main>
        </Personal.Top>
        <Team.TeamPage>{teams}</Team.TeamPage>
        <Team.CreateBtn onClick={() => setModal({ type: 'add' })}>팀 생성하기</Team.CreateBtn>
      </Personal.Container>
    </BaseTemplate>
  );
};

export default TeamDashboardPage;

import React from 'react';
import { listTeamDashboard } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import * as Personal from 'page/Dashboard/Personal/style';
import * as Team from './style';

const TeamDashboardPage = ({ className }: any) => {
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
      <Personal.Stacklist>{skill}</Personal.Stacklist>
    ));

    const contents = team.contents.map((content: any) => (
      <Team.Text>
        <Team.Title>{content.title}</Team.Title>
        <Team.ContentInfo>{content.text}</Team.ContentInfo>
      </Team.Text>
    ));

    return (
      <Team.List>
        <Team.Left>
          <Team.Name>{team.name}</Team.Name>
          <Personal.Stack>{skills}</Personal.Stack>
          <Team.Content>{contents}</Team.Content>
        </Team.Left>
        <Team.State state={team.state}>{team.state}</Team.State>
      </Team.List>
    );
  });
  return (
    <Personal.Container className={className}>
      <Personal.Top>
        <Personal.MainBtn>메인 메뉴</Personal.MainBtn>
        <Team.Main>팀 현황판</Team.Main>
      </Personal.Top>
      <Team.TeamPage>{teams}</Team.TeamPage>
      <Team.CreateBtn>팀 생성하기</Team.CreateBtn>
    </Personal.Container>
  );
};

export default TeamDashboardPage;

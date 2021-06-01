import React from 'react';
import { listTeamDashboard } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import * as P from 'page/Dashboard/Personal/style';
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
    // const people = team.people.map((person: string) => <div>{person}</div>);
    const skills = team.skills.map((skill: string) => (
      <P.Stacklist>{skill}</P.Stacklist>
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
          <P.Stack>{skills}</P.Stack>
          {/* <div>person: {people}</div> */}
          <Team.Content>{contents}</Team.Content>
        </Team.Left>
        <Team.State state="closed">모집중</Team.State>
      </Team.List>
    );
  });
  return (
    <P.Container className={className}>
      <P.Top>
        <P.MainBtn>메인 메뉴</P.MainBtn>
        <Team.Main>팀 현황판</Team.Main>
      </P.Top>
      <Team.TeamPage>{teams}</Team.TeamPage>
      <Team.CreateBtn>팀 생성하기</Team.CreateBtn>
    </P.Container>
  );
};

export default TeamDashboardPage;

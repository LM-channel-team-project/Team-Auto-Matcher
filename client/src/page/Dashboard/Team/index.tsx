import React from 'react';
import { listTeamDashboard } from 'graphql/queries';
import MenuBar from 'component/templates/menuBar';
import { gql, useQuery } from '@apollo/client';
import * as S from './style';

const TeamDashboardPage = ({ className }: any) => {
  const {
    loading, error, data, refetch,
  } = useQuery(gql`${listTeamDashboard}`);

  if (loading) {
    return <></>;
  }
  const temp = data.listTeamDashboard.items.map((el: any) => {
    const people = el.people.map((person: string) => (
      <div>{person}</div>
    ));
    const skills = el.skills.map((skill: string) => (
      <div>{skill}</div>
    ));
    const contents = el.contents.map((content: any) => (
      <div>
        <div>title : {content.title}</div>
        <div>text : {content.text}</div>
      </div>
    ));
    return (
      <div>
        <div>name : {el.name}</div>
        <div>person: {people}</div>
        <div>skills: {skills}</div>
        <div>contents: {contents}</div>
      </div>
    );
  });
  return (
    <>
      <MenuBar/>
      <S.TeamDashboardPage className={className}>
        TEAM Dashboard
        {temp}
      </S.TeamDashboardPage>
    </>
  );
};

export default TeamDashboardPage;

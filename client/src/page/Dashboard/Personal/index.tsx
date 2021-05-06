import React from 'react';
import { listPersonDashboard } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import * as S from './style';

const PersonalDashboardPage = ({ className }: any) => {
  const {
    loading, error, data, refetch,
  } = useQuery(gql`${listPersonDashboard}`);

  if (loading) {
    return <></>;
  }

  const temp = data.listPersonDashboard.items.map((el: any) => {
    const skills = el.skills.map((skill: string) => (<div>{skill}</div>));
    const contents = el.contents.map((content: any) => (
      <div>
        <div>title : {content.title}</div>
        <div>text: {content.text}</div>
      </div>
    ));
    return (

      <div>
        <div>name: {el.name}</div>
        <div>outline: {el.outline}</div>
        <div>skills: {skills}</div>
        <div>team: {el.team}</div>
        <div>contents: {contents}</div>
        <div>domain: {el.domain}</div>
      </div>
    );
  });

  return (
    <S.PersonalDashboardPage className={className}>
      Personal Dashboard
      <div>
        {temp}
      </div>
    </S.PersonalDashboardPage>
  );
};

export default PersonalDashboardPage;

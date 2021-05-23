import React, { useState } from 'react';
import { listPersonDashboard } from 'graphql/matchQueries';
import { gql, useQuery } from '@apollo/client';
import * as S from './style';

const Match = ({ className }: any) => {
  const [current, setCurrent] = useState<number>(0);
  const {
    loading, error, data, refetch,
  } = useQuery(
    gql`
      ${listPersonDashboard}
    `,
  );
  if (loading) {
    return <></>;
  }

  const { items } = data.listPersonDashboard;
  const users = items.reduce((obj: any, user: any) => {
    const result = { ...obj };
    if (result[user.field]) {
      result[user.field].push(user);
    } else {
      result[user.field] = [user];
    }
    return result;
  }, {});

  //   const length = Object.keys(user).length;

  const { length } = Object.keys(users);

  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const back = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  return (
    <>
      {Object.keys(users).map((field: any, index: number) => (
        <S.Container key={index}>
          {index === current && (
            <>
              <S.Top>
                <S.MainBtn>메인 메뉴</S.MainBtn>
                <S.Main>매칭 대기열</S.Main>
                <S.Slider>
                  <S.Button onClick={back}>
                    <S.Title>⬅️</S.Title>
                  </S.Button>
                  <S.Field>{field}</S.Field>
                  <S.Button onClick={next}>
                    <S.Title>➡️</S.Title>
                  </S.Button>
                </S.Slider>
              </S.Top>
              <S.MatchPage className={className}>
                {users[field].map((info: any) => (
                  <S.List key={info.id}>
                    <S.Title>{info.name}</S.Title>
                    <S.Text>{info.devExp}</S.Text>
                    <S.Stack>
                      {info.skills.map((skill: any) => (
                        <S.Stacklist>{skill}</S.Stacklist>
                      ))}
                    </S.Stack>
                    <S.Text>{info.outline}</S.Text>
                    <S.Team>{info.team}</S.Team>
                  </S.List>
                ))}
              </S.MatchPage>
            </>
          )}
        </S.Container>
      ))}
    </>
  );
};

export default Match;

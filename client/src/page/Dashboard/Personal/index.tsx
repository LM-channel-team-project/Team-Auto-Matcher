import React, { useState } from 'react';
import { listPersonDashboard } from 'graphql/matchQueries';
import { gql, useQuery } from '@apollo/client';
import * as S from './style';

const PersonalDashboardPage = ({ className }: any) => {
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

  const { length } = Object.keys(users);

  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const back = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  return (
    <>
      <S.Container>
        {Object.keys(users).map(
          (field: any, index: number) => index === current && (
            <div key={index}>
              <S.Top>
                <S.MainBtn>메인 메뉴</S.MainBtn>
                <S.Main>매칭 대기열</S.Main>
                <S.Slider>
                  <S.Button onClick={back}>
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 40 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.21201 20.8787C0.0404397 22.0502 0.0404395 23.9497 1.21201 25.1213L20.3039 44.2132C21.4755 45.3848 23.375 45.3848 24.5465 44.2132C25.7181 43.0416 25.7181 41.1421 24.5465 39.9706L7.57597 23L24.5465 6.02944C25.7181 4.85786 25.7181 2.95837 24.5465 1.78679C23.375 0.615221 21.4755 0.61522 20.3039 1.78679L1.21201 20.8787ZM40 20L3.33333 20L3.33333 26L40 26L40 20Z"
                        fill="black"
                      />
                    </svg>
                  </S.Button>
                  <S.Field>{field}</S.Field>
                  <S.Button onClick={next}>
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 44 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M42.6213 25.1213C43.7929 23.9497 43.7929 22.0503 42.6213 20.8787L23.5294 1.7868C22.3579 0.615223 20.4584 0.615223 19.2868 1.7868C18.1152 2.95837 18.1152 4.85786 19.2868 6.02944L36.2574 23L19.2868 39.9706C18.1152 41.1421 18.1152 43.0416 19.2868 44.2132C20.4584 45.3848 22.3579 45.3848 23.5294 44.2132L42.6213 25.1213ZM0.5 26L40.5 26V20L0.5 20L0.5 26Z"
                        fill="black"
                      />
                    </svg>
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
                        <S.Stacklist key={skill}>{skill}</S.Stacklist>
                      ))}
                    </S.Stack>
                    <S.Text>{info.outline}</S.Text>
                    <S.Team>{info.team}</S.Team>
                  </S.List>
                ))}
              </S.MatchPage>
            </div>
          ),
        )}
      </S.Container>
    </>
  );
};

export default PersonalDashboardPage;

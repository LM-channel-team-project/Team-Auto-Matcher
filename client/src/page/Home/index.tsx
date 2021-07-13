import React, { useEffect, useState } from 'react';
import { getUser } from 'graphql/queries';
import { Auth } from 'aws-amplify';
import { gql, useQuery } from '@apollo/client';
import BaseTemplate from 'page/BaseTemplate';
import * as S from './style';

function Home() {
  const [phase, setPhase] = useState<Number>(2);

  const { data } = useQuery(
    gql`
      ${getUser}
    `,
  );
  useEffect(() => {
    console.log(data);
    if (data) {
      if (data.getUser.items[0].surveyCompleted) {
        setPhase(2);
      } else {
        setPhase(1);
      }
    } else if (data === undefined) {
      setPhase(0);
    }
  }, []);

  // 0단계에서는 로그인 요구
  // 1단계에서는 setIsLogin? 서베이 완료 요구
  // 2단계에서는 서베이 완료했으니, 팀원들 둘러보기 요구
  return (
    <BaseTemplate>
      <S.Home>{phase}</S.Home>
    </BaseTemplate>
  );
}

export default Home;

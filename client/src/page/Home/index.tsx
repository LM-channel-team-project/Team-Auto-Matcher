import React from 'react';
import { getUser } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import BaseTemplate from 'page/BaseTemplate';
import * as S from './style';

function Home() {
  const { data } = useQuery(
    gql`
      ${getUser}
    `,
  );
  return (
    <BaseTemplate>
      <S.Home>HomePage</S.Home>
    </BaseTemplate>
  );
}

export default Home;

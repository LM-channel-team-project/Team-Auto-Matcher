import React from 'react';

import * as S from './style';

interface ILoading {
  className?: string;
}

const Loading = ({ className }: ILoading) => (
  <S.Container>
    <S.Circle />
    <S.Text>loading...</S.Text>
  </S.Container>
);

export default Loading;

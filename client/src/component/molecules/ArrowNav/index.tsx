import React from 'react';
import { arrowDirection } from 'component/atoms/ArrowBtn';
import * as S from './style';

interface IArrowNav {
  className?: string;
}

function ArrowNav({ className }: IArrowNav) {
  return (
    <S.ArrowNav className={className}>
      <S.ArrowBtnWrapper>
        <S.ArrowBtn direction={arrowDirection.LEFT} />
      </S.ArrowBtnWrapper>
      <S.ArrowBtnWrapper>
        <S.ArrowBtn direction={arrowDirection.RIGHT} />
      </S.ArrowBtnWrapper>
    </S.ArrowNav>
  );
}

export default ArrowNav;

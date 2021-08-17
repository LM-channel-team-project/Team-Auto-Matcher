import React from 'react';
import { arrowDirection } from 'component/atoms/ArrowBtn';
import * as S from './style';

interface IArrowNav {
  leftOnClick: React.MouseEventHandler<HTMLDivElement>,
  rightOnClick: React.MouseEventHandler<HTMLDivElement>,
  className?: string;
}

function ArrowNav({ leftOnClick, rightOnClick, className }: IArrowNav) {
  return (
    <S.ArrowNav className={className}>
      <S.ArrowBtnWrapper onClick={leftOnClick}>
        <S.ArrowBtn direction={arrowDirection.LEFT} />
      </S.ArrowBtnWrapper>
      <S.ArrowBtnWrapper onClick={rightOnClick}>
        <S.ArrowBtn direction={arrowDirection.RIGHT} />
      </S.ArrowBtnWrapper>
    </S.ArrowNav>
  );
}

export default ArrowNav;

import React from 'react';
import { EDirection } from 'component/atoms/DirectionBtn';
import * as S from './style';

interface IDirectionNav {
  leftOnClick: React.MouseEventHandler<HTMLDivElement>;
  rightOnClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

function DirectionNav({ leftOnClick, rightOnClick, className }: IDirectionNav) {
  return (
    <S.DirectionNav className={className}>
      <S.DirectionWrapper onClick={leftOnClick}>
        <S.DirectionBtn direction={EDirection.BACK} />
      </S.DirectionWrapper>
      <S.DirectionWrapper onClick={rightOnClick}>
        <S.DirectionBtn direction={EDirection.NEXT} />
      </S.DirectionWrapper>
    </S.DirectionNav>
  );
}

export default DirectionNav;

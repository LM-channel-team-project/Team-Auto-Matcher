import React from 'react';
import * as S from './style';

export enum EDirection {
  BACK = 'BACK',
  NEXT = 'NEXT',
}

export interface IDirectionBtn {
  direction?: string;
  className?: string;
}

function DirectionBtn({ direction = EDirection.BACK }: IDirectionBtn) {
  if (direction === EDirection.BACK) {
    return <S.Span>BACK</S.Span>;
  }
  if (direction === EDirection.NEXT) {
    return <S.Span>NEXT</S.Span>;
  }
  return <S.Span>BACK</S.Span>;
}

export default DirectionBtn;

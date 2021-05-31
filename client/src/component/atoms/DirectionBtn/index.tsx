import React from 'react';
import * as S from './style';

export enum EDirection {
  BACK = 'BACK',
  NEXT = 'NEXT'
}

export interface IDirectionBtn {
  direction?: string;
  className?: string;
}

function DirectionBtn({ direction }: IDirectionBtn) {
  if (direction === EDirection.BACK) {
    return (
      <S.Span>BACK</S.Span>
    );
  }
  if (direction === EDirection.NEXT) {
    return (
      <S.Span>NEXT</S.Span>
    );
  }
  return (
    <div>There need to be a direction</div>
  );
}

export default DirectionBtn;

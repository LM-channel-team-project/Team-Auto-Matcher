import React from 'react';
import * as S from './style';

export interface IDirection {
  BACK: string;
  NEXT: string;
}

export interface IDirectionBtn {
  direction?: string;
  className?: string;
}

export const arrowDirection: IDirection = {
  BACK: 'BACK',
  NEXT: 'NEXT',
};

function DirectionBtn({ direction }: IDirectionBtn) {
  if (direction === arrowDirection.BACK) {
    return (
      <S.Span>BACK</S.Span>
    );
  }
  if (direction === arrowDirection.NEXT) {
    return (
      <S.Span>NEXT</S.Span>
    );
  }
  return (
    <div>There need to be a direction</div>
  );
}

export default DirectionBtn;

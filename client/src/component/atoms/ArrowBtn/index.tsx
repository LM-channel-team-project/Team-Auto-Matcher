import React from 'react';
import * as S from './style';

export interface IArrowDirection {
  UP: string;
  DOWN: string;
  LEFT: string;
  RIGHT: string;
}

export interface IArrowBtn {
  direction?: string;
  className?: string;
}

export const arrowDirection: IArrowDirection = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

function ArrowBtn({ direction = arrowDirection.LEFT, className }: IArrowBtn) {
  if (direction === arrowDirection.LEFT) {
    return (
      <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="60" fill="white" />
        <path d="M1.21201 27.8787C0.0404397 29.0502 0.0404395 30.9497 1.21201 32.1213L20.3039 51.2132C21.4755 52.3848 23.375 52.3848 24.5465 51.2132C25.7181 50.0416 25.7181 48.1421 24.5465 46.9706L7.57597 30L24.5465 13.0294C25.7181 11.8579 25.7181 9.95837 24.5465 8.78679C23.375 7.61522 21.4755 7.61522 20.3039 8.78679L1.21201 27.8787ZM40 27L3.33333 27L3.33333 33L40 33L40 27Z" fill="black" />
      </svg>
    );
  }
  if (direction === arrowDirection.RIGHT) {
    return (
      <svg width="44" height="60" viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" width="39.3443" height="60" fill="white" />
        <path d="M42.6213 32.1213C43.7929 30.9497 43.7929 29.0503 42.6213 27.8787L23.5294 8.7868C22.3579 7.61522 20.4584 7.61522 19.2868 8.7868C18.1152 9.95837 18.1152 11.8579 19.2868 13.0294L36.2574 30L19.2868 46.9706C18.1152 48.1421 18.1152 50.0416 19.2868 51.2132C20.4584 52.3848 22.3579 52.3848 23.5294 51.2132L42.6213 32.1213ZM0.5 33L40.5 33V27L0.5 27L0.5 33Z" fill="black" />
      </svg>
    );
  }
  return (
    <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="60" fill="white" />
      <path d="M1.21201 27.8787C0.0404397 29.0502 0.0404395 30.9497 1.21201 32.1213L20.3039 51.2132C21.4755 52.3848 23.375 52.3848 24.5465 51.2132C25.7181 50.0416 25.7181 48.1421 24.5465 46.9706L7.57597 30L24.5465 13.0294C25.7181 11.8579 25.7181 9.95837 24.5465 8.78679C23.375 7.61522 21.4755 7.61522 20.3039 8.78679L1.21201 27.8787ZM40 27L3.33333 27L3.33333 33L40 33L40 27Z" fill="black" />
    </svg>
  );
}

export default ArrowBtn;

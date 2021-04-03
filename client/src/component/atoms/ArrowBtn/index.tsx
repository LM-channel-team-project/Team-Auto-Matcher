import React from 'react';

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
      <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.21201 20.8787C0.0404397 22.0502 0.0404395 23.9497 1.21201 25.1213L20.3039 44.2132C21.4755 45.3848 23.375 45.3848 24.5465 44.2132C25.7181 43.0416 25.7181 41.1421 24.5465 39.9706L7.57597 23L24.5465 6.02944C25.7181 4.85786 25.7181 2.95837 24.5465 1.78679C23.375 0.615221 21.4755 0.61522 20.3039 1.78679L1.21201 20.8787ZM40 20L3.33333 20L3.33333 26L40 26L40 20Z" fill="black" />
      </svg>
    );
  }
  if (direction === arrowDirection.RIGHT) {
    return (
      <svg width="44" height="46" viewBox="0 0 44 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42.6213 25.1213C43.7929 23.9497 43.7929 22.0503 42.6213 20.8787L23.5294 1.7868C22.3579 0.615223 20.4584 0.615223 19.2868 1.7868C18.1152 2.95837 18.1152 4.85786 19.2868 6.02944L36.2574 23L19.2868 39.9706C18.1152 41.1421 18.1152 43.0416 19.2868 44.2132C20.4584 45.3848 22.3579 45.3848 23.5294 44.2132L42.6213 25.1213ZM0.5 26L40.5 26V20L0.5 20L0.5 26Z" fill="black" />
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

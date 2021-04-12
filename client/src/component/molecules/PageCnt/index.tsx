import React from 'react';
import * as S from './style';

interface IPageCnt {
  currentPage: number;
  totalPage: number
  className?: string;
}

function PageCnt({ currentPage, totalPage, className }: IPageCnt) {
  return (
    <S.PageCnt className={className}>
      <div> {currentPage} / {totalPage} </div>
    </S.PageCnt>
  );
}

export default PageCnt;

import React from 'react';
import * as S from './style';

interface IDetailContent {
  title: string;
  children: any;
  className?: string;
}

const DetailContent = ({ title, children, className }: IDetailContent) => (
  <S.DetailContent className={className}>
    <S.HeaderWrapper>
      <S.Title className="dc-title">{title}</S.Title>
    </S.HeaderWrapper>
    <S.BodyWrapper className="dc-body">{children}</S.BodyWrapper>
  </S.DetailContent>
);

export default DetailContent;

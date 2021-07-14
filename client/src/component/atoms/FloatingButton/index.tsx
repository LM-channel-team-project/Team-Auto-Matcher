import React from 'react';
import * as S from './style';

export interface IFloatingButton {
  onClick?: any;
  children: any;
  className?: string;
}

const FloatingButton = ({ children, ...props }: IFloatingButton) => (
  <S.FloatingButton {...props}>{children}</S.FloatingButton>
);

export default FloatingButton;

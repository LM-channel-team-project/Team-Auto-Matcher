import React from 'react';
import * as S from './style';

export interface Props extends S.StyleProps {
  onClick?: any;
  children: any;
  className?: string;
}

function Button({ children, ...props }: Props) {
  return <S.Button {...props}>{children}</S.Button>;
}

export default Button;

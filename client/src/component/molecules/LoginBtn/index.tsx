import React from 'react';
import * as S from './style';

interface ILoginBtn {
  text: string;
  className?: string;
  onLoginClick: any;
}

function LoginBtn({ text, className, onLoginClick }: ILoginBtn) {
  return (
    <S.LoginBtn onClick={onLoginClick} className={className}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </S.LoginBtn>
  );
}

export default LoginBtn;

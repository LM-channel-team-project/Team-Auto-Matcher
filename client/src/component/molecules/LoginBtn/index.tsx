import React from 'react';
import * as S from './style';

interface ILoginBtn {
  className?: string;
  onLoginClick:any;
}

function LoginBtn({ className, onLoginClick }: ILoginBtn) {
  return (
    <S.LoginBtn onClick={onLoginClick} className={className}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      구글로그인
    </S.LoginBtn>
  );
}

export default LoginBtn;

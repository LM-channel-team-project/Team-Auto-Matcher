import React from 'react';
import * as S from './style';

interface IInputText {
  checked?: boolean
  className?: string;
}

function InputText({ className }: IInputText) {
  return (
    <S.InputText className={className} type="text" />
  );
}

export default InputText;

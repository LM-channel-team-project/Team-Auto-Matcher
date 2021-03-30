import React from 'react';
import * as S from './style';

interface ICheckbox {
  className?: string;
}

function Checkbox({ className }: ICheckbox) {
  return (
    <S.Input className={className} type="checkbox" />
  );
}

export default Checkbox;

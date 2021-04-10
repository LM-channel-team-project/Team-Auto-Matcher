import React from 'react';
import * as S from './style';

interface ICheckbox {
  checked?: boolean
  className?: string;
}

function Checkbox({ checked = false, className }: ICheckbox) {
  return (
    <S.Input checked={checked} className={className} readOnly type="checkbox" />
  );
}

export default Checkbox;

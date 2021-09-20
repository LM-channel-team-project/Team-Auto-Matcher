import React from 'react';

import * as S from './style';

export interface ITextLabel extends S.StyleProps {
  text: string;
  className?: string;
}

function TextLabel({ text, ...props }: ITextLabel) {
  return (
    <S.TextLabel {...props}>
      <S.Text>{text}</S.Text>
    </S.TextLabel>
  );
}

export default TextLabel;

import React from 'react';
import * as S from './style';

export interface Props extends S.StyleProps {
  text: string;
  divider?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const AutoCompleteItem = ({
  color, size = 'medium', text, onClick, ...props
}: Props) => (
  <S.AutoComplete {...props} onClick={onClick}>
    <S.ColorCircle color={color} size={size} />
    <S.Text size={size}>{text}</S.Text>
  </S.AutoComplete>
);

export default AutoCompleteItem;

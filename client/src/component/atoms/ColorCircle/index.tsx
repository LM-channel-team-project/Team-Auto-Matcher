import React from 'react';
import * as S from './style';

export interface Props extends S.StyleProps {}

const ColorCircle = (props: Props) => <S.Circle {...props}></S.Circle>;

export default ColorCircle;

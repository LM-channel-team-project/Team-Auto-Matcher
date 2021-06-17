import React from 'react';
import globalTheme from 'style/theme';
import * as S from './style';

type Colors = {
  [key: string]: keyof typeof globalTheme.color.label;
}

interface Props {
  list?: string[];
  colors?: Colors;
  value?: string | number;
  className?: string;
  maxWidth?: number;
  minWidth?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  removeLabel?: (event: React.MouseEvent<HTMLButtonElement>, itemName: string) => void;
}

const LabelInputBox = ({
  list = [], colors = {}, removeLabel, className, ...inputProps
}: Props) => (
  <S.Container className={className}>
    {list.map((item) => <S.LabelWrapper key={item}>
      <S.TextLabel
        className="lb-label"
        text={item}
        color={colors[String(item).toLowerCase()]}
      />
      <S.LabelRemoveBottton onClick={(event) => removeLabel && removeLabel(event, item)}>
        &times;
      </S.LabelRemoveBottton>
    </S.LabelWrapper>)}
    <S.Input className="lb-input" autoWidth {...inputProps}/>
  </S.Container>
);

export default LabelInputBox;

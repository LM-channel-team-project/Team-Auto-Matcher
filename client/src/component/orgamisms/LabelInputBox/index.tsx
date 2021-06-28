import { Item } from 'component/orgamisms/AutoCompleteList';
import React from 'react';
import globalTheme from 'style/theme';
import * as S from './style';

type Colors = {
  [key: string]: keyof typeof globalTheme.color.label;
}

interface Completor {
  ref?: React.MutableRefObject<HTMLDivElement | undefined>;
  items?: Item[];
  onItemClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface Props {
  list?: string[];
  colors?: Colors;
  value?: string | number;
  className?: string;
  maxWidth?: number;
  minWidth?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  removeLabel?: (event: React.MouseEvent<HTMLButtonElement>, itemName: string) => void;
  completor?: Completor;
}

const LabelInputBox = ({
  list = [], colors = {}, removeLabel, className, completor, ...inputProps
}: Props) => {
  const isCompletorItem = Boolean(completor?.items?.length);
  return (
    <S.Container className={className}>
      {list.map((item) => <S.LabelWrapper key={item}>
        <S.TextLabel
          className="lb-label"
          text={item}
          color={colors[String(item)]}
        />
        <S.LabelRemoveBottton onClick={(event) => removeLabel && removeLabel(event, item)}>
        &times;
        </S.LabelRemoveBottton>
      </S.LabelWrapper>)}
      <S.InputContainer>
        <S.Input className="lb-input" autoWidth {...inputProps} />
        {isCompletorItem && <S.AutoCompletor
          listRef={completor?.ref}
          items={completor?.items}
          onClick={completor?.onItemClick}
        />}
      </S.InputContainer>
    </S.Container>
  );
};

export default LabelInputBox;

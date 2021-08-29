import React from 'react';
import getKoreaTime from 'utils/date';
import { CommentsType } from '../DetailModal/template';
import * as S from './style';

export interface Props {
  list: CommentsType[];
  value: string;
  className?: string;
  maxWidth: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  removeLabel: (
    event: React.MouseEvent<HTMLButtonElement>,
    itemName: string,
  ) => void;
}

const CommentInputBox = ({
  list = [],
  removeLabel,
  className,
  ...inputProps
}: Props) => (
  <S.Container className={className}>
    {list.map((item: CommentsType) => (
      <S.LabelWrapper key={`${item.date + item.owner}`}>
        <S.TextLabel
          className="lb-label"
          text={item.name}
        />
        <S.TextLabel
          className="lb-label"
          text={getKoreaTime(item.date)}
        />
        <S.TextLabel
          className="lb-label"
          text={item.comment}
        />
        <S.LabelRemoveBottton
          onClick={(event) => removeLabel && removeLabel(event, `${item.date + item.owner}`)}
        >
          &times;
        </S.LabelRemoveBottton>
      </S.LabelWrapper>
    ))}
    <S.InputContainer>
      <S.Input className="lb-input" autoWidth {...inputProps} />
    </S.InputContainer>
  </S.Container>
);

export default CommentInputBox;

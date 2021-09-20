import React from 'react';

import getKoreaTime from 'utils/date';

import { CommentsType } from '../DetailModal/template';
import * as S from './style';

export interface ICommentInputBox {
  list: CommentsType[];
  teamId?: string;
  myId?: string;
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
  teamId,
  myId,
  removeLabel,
  className,
  ...inputProps
}: ICommentInputBox) => (
  <S.Container className={className}>
    {list.map((item: CommentsType) => (
      <S.LabelWrapper key={`${item.date + item.owner}`}>
        <S.TextLabel
          className="lb-label"
          text={`작성자: ${item.name}`}
        />
        <S.TextLabel
          className="lb-label"
          text={`작성일: ${getKoreaTime(item.date)}`}
        />
        <S.Paragraph>{item.comment}</S.Paragraph>
        {(item.owner === myId || teamId === myId)
          && <S.LabelRemoveBottton
            onClick={(event) => removeLabel && removeLabel(event, `${item.date + item.owner}`)}
          >
            &times;
          </S.LabelRemoveBottton>
        }
      </S.LabelWrapper>
    ))}
    {myId
    && <S.BlockContent title='새 댓글' className="ci-block">
      <S.InputContainer>
        <S.Input className="lb-input" type='textarea' autoWidth {...inputProps} />
      </S.InputContainer>
    </S.BlockContent>
    }
  </S.Container>
);

export default CommentInputBox;

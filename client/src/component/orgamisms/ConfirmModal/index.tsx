import React from 'react';
import Button from 'component/atoms/Button';
import CloseBtn from 'component/atoms/CloseBtn';
import * as S from './style';

function ConfirmModal({ close, onClickConfirm, text }: any) {
  return (
    <S.Main>
      <S.Container>
        <S.Content>
          <S.CloseButtonWrapper onClick={close}>
            <CloseBtn />
          </S.CloseButtonWrapper>
          <S.Text>{text}</S.Text>
          <S.Btns>
            <Button outLine size="confirmModal" onClick={close}>
              취소
            </Button>
            <Button
              size="confirmModal"
              color="bred"
              fontColor="white"
              onClick={onClickConfirm}
            >
              확인
            </Button>
          </S.Btns>
        </S.Content>
      </S.Container>
    </S.Main>
  );
}
export default ConfirmModal;

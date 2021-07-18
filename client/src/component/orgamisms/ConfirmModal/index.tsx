import React from 'react';
import Button from 'component/atoms/Button';
import CloseBtn from 'component/atoms/CloseBtn';
import * as S from './style';

function ConfirmModal({
  open, close, ConfirmSubmit, surveyCompleted,
}: any) {
  return (
    <S.Main openModal={open}>
      {open ? (
        <S.Container>
          <S.Content>
            <S.CloseButtonWrapper onClick={close}>
              <CloseBtn />
            </S.CloseButtonWrapper>
            <S.Text>
              {surveyCompleted === true
                ? '업데이트를 하시겠습니까?'
                : '등록하시겠습니까?'}
            </S.Text>
            <S.Btns>
              <Button outLine size="confirmModal" onClick={close}>
                취소
              </Button>
              <Button
                size="confirmModal"
                color="bred"
                fontColor="white"
                onClick={ConfirmSubmit}
              >
                확인
              </Button>
            </S.Btns>
          </S.Content>
        </S.Container>
      ) : null}
    </S.Main>
  );
}
export default ConfirmModal;

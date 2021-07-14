import React from 'react';
import Button from 'component/atoms/Button';
import CloseBtn from 'component/atoms/CloseBtn';
import * as S from './style';

function ConfirmModal({ title }: any) {
  return (
    <S.Main>
      <S.Container>
        <S.Content>
          <S.CloseButtonWrapper>
            <CloseBtn />
          </S.CloseButtonWrapper>
          <S.Text>{title}</S.Text>
          <S.Btns>
            <Button outLine size="confirmModal">
              취소
            </Button>
            <Button size="confirmModal" color="bred" fontColor="white">
              확인
            </Button>
          </S.Btns>
        </S.Content>
      </S.Container>
    </S.Main>
  );
}
export default ConfirmModal;

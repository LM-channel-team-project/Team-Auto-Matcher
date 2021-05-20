import React from 'react';
import CloseBtn from 'component/atoms/CloseBtn';
import * as S from './style';

interface IDetailModalTemplate {
  modalHeader: React.ReactNode;
  modalBody: React.ReactNode;
  modalButton: React.ReactNode;
  onCloseModal: () => void;
}

const DetailModalTemplate = ({
  modalHeader,
  modalBody,
  modalButton,
  onCloseModal,
}: IDetailModalTemplate) => (
  <S.DetailModal>
    <S.CloseButtonWrapper onClick={onCloseModal}>
      <CloseBtn />
    </S.CloseButtonWrapper>
    <S.HeaderWrapper>
      {modalHeader}
    </S.HeaderWrapper>
    <S.BodyContainer>{modalBody}</S.BodyContainer>
    <S.ButtonWrapper>{modalButton}</S.ButtonWrapper>
  </S.DetailModal>
);

export default DetailModalTemplate;

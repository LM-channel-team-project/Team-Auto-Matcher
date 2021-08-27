import React from 'react';
import CloseBtn from 'component/atoms/CloseBtn';
import * as S from './style';

export type ContentItem = {
  title: string;
  text: string;
};
export type QuestionItem = {
  title: string;
  answers: string[];
};
export type TeamListType = {
  id: string;
  name: string;
};
export type MailType = {
  from: string;
  teamId: string;
  type: string;
  teamName: string;
  date: Date;
};
export type CommentsType = {
  date: Date;
  owner: string;
  comment: string;
  name: string;
}
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
    <S.HeaderWrapper>{modalHeader}</S.HeaderWrapper>
    <S.BodyContainer>{modalBody}</S.BodyContainer>
    <S.ButtonWrapper>{modalButton}</S.ButtonWrapper>
  </S.DetailModal>
);

export default DetailModalTemplate;

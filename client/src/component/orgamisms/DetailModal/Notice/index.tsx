import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { DELETE_NOTICE } from 'graphql/mutations';
import { LIST_NOTICE } from 'graphql/queries';
import getKoreaTime from 'utils/date';
import makeObjectShorten from 'utils/makeObjectShorten';

import ConfirmModal from 'component/orgamisms/ConfirmModal';
import DetailModalTemplate from '../template';
import * as S from '../style';

export interface NoticeModalProps {
  className?: string;
  data?: {
    id: string;
    title: string;
    date: Date;
    contents: string;
  };
  isAdmin: boolean;
  onCloseModal: () => void;
}

const NoticeDetailModal = ({
  className,
  data,
  isAdmin,
  onCloseModal,
}: NoticeModalProps) => {
  const { refetch } = useQuery(LIST_NOTICE);
  const [deleteNoticeData] = useMutation(DELETE_NOTICE);

  const [modalOpen, setModalOpen] = useState(false);
  const confirmText = '확인을 누르면 공지가 삭제됩니다.';
  const [confirmFunction, setConfirmFunction] = useState<any>(() => { });
  const modalHeader = () => {
    const createdAt = data && getKoreaTime(data.date);

    return (
      <>
        <S.Title type="personal">{data?.title}</S.Title>
        <S.Desc>{createdAt}</S.Desc>
      </>
    );
  };

  const renderContents = <S.Paragraph>{data?.contents}</S.Paragraph>;

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickDelete = () => {
    const confirmDelete = async () => {
      const noticeObject = {
        id: data?.id,
      };
      await deleteNoticeData(makeObjectShorten(noticeObject));
      await refetch();
      onCloseModal();
      closeModal();
    };
    openModal();
    setConfirmFunction(() => confirmDelete);
  };

  const modalButton = () => {
    if (isAdmin) {
      return (
        <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
          공지 삭제
        </S.SubmitButton>
      );
    }
    return (
      <S.SubmitButton size="medium" color="yellow" onClick={onCloseModal}>
        닫기
      </S.SubmitButton>
    );
  };

  return data ? (
    <>
      <DetailModalTemplate
        modalHeader={modalHeader()}
        modalBody={renderContents}
        modalButton={modalButton()}
        onCloseModal={onCloseModal}
      />
      {modalOpen && (
        <ConfirmModal
          text={confirmText}
          close={closeModal}
          onClickConfirm={confirmFunction}
        />
      )}
    </>
  ) : (
    <div>error</div>
  );
};

export default NoticeDetailModal;

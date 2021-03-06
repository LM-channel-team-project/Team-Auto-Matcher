import React, { useState } from 'react';
import { listNotice } from 'graphql/queries';
import { deleteNotice } from 'graphql/mutations';
import getKoreaTime from 'utils/date';
import { gql, useQuery, useMutation } from '@apollo/client';
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
  const { refetch } = useQuery(
    gql`
      ${listNotice}
    `,
  );

  const [deleteNoticeData] = useMutation(
    gql`
      ${deleteNotice}
    `,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const confirmText = '확인을 누르면 공지가 삭제됩니다.';
  const [confirmFunction, setConfirmFunction] = useState<any>(() => {});
  const modalHeader = () => {
    let createdAt;
    if (data) {
      createdAt = getKoreaTime(data.date);
    }
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
      await deleteNoticeData({
        variables: {
          input: {
            id: data?.id,
          },
        },
      });
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

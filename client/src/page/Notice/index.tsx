import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_USER, LIST_NOTICE } from 'graphql/queries';
import getKoreaTime from 'utils/date';

import NoticeDetailModal, { NoticeModalProps } from 'component/orgamisms/DetailModal/Notice';
import NoticeAddForm from 'component/orgamisms/DetailModal/NoticeAddForm';
import BaseTemplate from 'page/BaseTemplate';
import LoadingPage from 'page/Loading';
import * as S from './style';

type ExtractType<O, K> = K extends keyof O ? O[K] : never;
type UserData = ExtractType<NoticeModalProps, 'data'>;

interface ModalState {
  type?: 'detail' | 'add';
  data?: UserData;
}

const Notice = ({ className }: any) => {
  const [modal, setModal] = useState<ModalState>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { data } = useQuery(GET_USER);
  const { loading, data: noticeData } = useQuery(LIST_NOTICE);
  useEffect(() => {
    const admin = [
      'google_106151528337997471500',
      'google_105106168339038633380',
      'google_116436995621806622506',
    ];
    if (admin.includes(data?.getUser.items[0]?.owner)) {
      setIsAdmin(true);
    }
  }, [data]);
  if (loading) {
    return <LoadingPage />;
  }

  const { items } = noticeData?.listNotice;
  const NoticeList = items.map((el: any) => (
    <S.List key={el.id} onClick={() => setModal({ type: 'detail', data: el })}>
      <S.Title>{el.title}</S.Title>
      <S.Text>{getKoreaTime(el.date)}</S.Text>
    </S.List>
  ));

  const renderModal = () => {
    const onCloseModal = () => setModal({});

    switch (modal?.type) {
      case 'detail':
        return (
          <NoticeDetailModal
            isAdmin={isAdmin}
            data={modal.data}
            onCloseModal={onCloseModal}
          />
        );
      case 'add':
        return <NoticeAddForm onCloseModal={onCloseModal} />;
      default:
        return '';
    }
  };

  const onClickmakeNotice = () => {
    setModal({ type: 'add' });
  };

  return (
    <BaseTemplate Modal={renderModal()} closeModal={() => setModal({})}>
      <S.Container className={className}>
        <S.Top>
          <S.Main>공지 사항</S.Main>
        </S.Top>
        <S.NoticeList>{NoticeList}</S.NoticeList>
        {isAdmin && (
          <S.CreateBtn onClick={onClickmakeNotice}>공지 추가하기</S.CreateBtn>
        )}
      </S.Container>
    </BaseTemplate>
  );
};

export default Notice;

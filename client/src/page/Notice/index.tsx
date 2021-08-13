import React, { useCallback, useEffect, useState } from 'react';
import BaseTemplate from 'page/BaseTemplate';
import { createNotice } from 'graphql/mutations';
import { getUser, listNotice } from 'graphql/queries';
import { gql, useQuery, useMutation } from '@apollo/client';
import NoticeDetailModal, { NoticeModalProps } from 'component/orgamisms/DetailModal/Notice';
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

  const { data } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const [createNoticeData] = useMutation(
    gql`
      ${createNotice}
    `,
  );

  const { loading, data: noticeData } = useQuery(
    gql`
      ${listNotice}
    `,
  );
  useEffect(() => {
    const admin = ['google_106151528337997471500', 'google_105106168339038633380', 'google_116436995621806622506'];
    if (admin.includes(data?.getUser.items[0].owner)) {
      setIsAdmin(true);
    }
  }, [data]);
  if (loading) {
    return <></>;
  }

  const { items } = noticeData?.listNotice;
  const NoticeList = items.map((el: any) => (
    <S.List key={el.id} onClick={() => setModal({ type: 'detail', data: el })}>
      <S.Title>{el.title}</S.Title>
      <S.Text>{el.date}</S.Text>
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
      return (
        <TeamAddForm
          onCloseModal={onCloseModal}
        />
      );
    default:
      return '';
    }
  };

  const makeNotice = () => {
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
          <S.CreateBtn onClick={makeNotice}>공지 추가하기</S.CreateBtn>
        )}
      </S.Container>
    </BaseTemplate>
  );
};

export default Notice;

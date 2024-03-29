import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_USER } from 'graphql/queries';
import getKoreaTime from 'utils/date';

import MailDetailModal, { MailModalProps } from 'component/orgamisms/DetailModal/Mail';
import BaseTemplate from 'page/BaseTemplate';
import LoadingPage from 'page/Loading';
import * as S from './style';

type ExtractType<O, K> = K extends keyof O ? O[K] : never;
type UserData = ExtractType<MailModalProps, 'data'>;

interface ModalState {
  type?: 'detail';
  data?: UserData;
}

const Mail = ({ className, isLoggedIn }: any) => {
  const [modal, setModal] = useState<ModalState>({});

  const { loading, data } = useQuery(GET_USER);
  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login');
    }
  }, [isLoggedIn]);

  if (loading) {
    return <LoadingPage />;
  }
  const mail = data && data.getUser.items?.length !== 0 ? data.getUser.items[0].mail : [];
  const mailList = mail.map((el: any) => {
    let type;
    if (el.type === 'invite') {
      type = '팀 초대 메세지';
    } else if (el.type === 'apply') {
      type = '팀 지원 메시지';
    } else if (el.type === 'accept') {
      type = '팀 승인 메시지';
    } else if (el.type === 'refuse') {
      type = '팀 거절 메시지';
    }

    return (
      <S.List key={el.from} onClick={() => setModal({ data: el })}>
        <S.Title>{type}</S.Title>
        <S.Text>{getKoreaTime(el.date)}</S.Text>
      </S.List>
    );
  });

  const renderModal = () => {
    const onCloseModal = () => setModal({});

    return (
      modal.data && (
        <MailDetailModal data={modal.data} onCloseModal={onCloseModal} />
      )
    );
  };

  return (
    <BaseTemplate Modal={renderModal()} closeModal={() => setModal({})}>
      <S.Container className={className}>
        <S.Top>
          <S.Main>메시지 보관함</S.Main>
        </S.Top>
        <S.MailList>
          {mailList.length === 0 ? '메일함이 비어있습니다.' : mailList}
        </S.MailList>
      </S.Container>
    </BaseTemplate>
  );
};

export default Mail;

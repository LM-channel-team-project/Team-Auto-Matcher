import React, { useState } from 'react';
import BaseTemplate from 'page/BaseTemplate';
import { getUser } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import MailDetailModal, {
  MailModalProps,
} from 'component/orgamisms/DetailModal/Mail';
import * as S from './style';

type ExtractType<O, K> = K extends keyof O ? O[K] : never;
type UserData = ExtractType<MailModalProps, 'data'>;

interface ModalState {
  type?: 'detail';
  data?: UserData;
}

const Mail = ({ className }: any) => {
  const [modal, setModal] = useState<ModalState>({});

  const {
    loading, error, data, refetch,
  } = useQuery(
    gql`
      ${getUser}
    `,
  );

  if (loading) {
    return <></>;
  }
  const { mail } = data.getUser.items[0];
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
        <S.Text>{el.teamName}팀</S.Text>
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
          <S.Main>초대 보관함</S.Main>
        </S.Top>
        <S.MailList>{mailList}</S.MailList>
      </S.Container>
    </BaseTemplate>
  );
};

export default Mail;
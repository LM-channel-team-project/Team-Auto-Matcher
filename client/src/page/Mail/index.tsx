import React, { useState } from 'react';
import BaseTemplate from 'page/BaseTemplate';
import { getUser } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import PersonalDetailModal, {
  PersonalModalProps,
} from 'component/orgamisms/DetailModal/Mail';
import * as S from './style';

type ExtractType<O, K> = K extends keyof O ? O[K] : never;
type UserData = ExtractType<PersonalModalProps, 'data'>;

interface ModalState {
  type?: 'detail' | 'add';
  data?: UserData;
}

const Mail = ({ className }: any) => {
  const [modal, setModal] = useState<ModalState>({});

  const [current, setCurrent] = useState<number>(0);
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

  const { items } = data.listPersonDashboard;
  const users = items.reduce((obj: any, user: any) => {
    const result = { ...obj };
    if (result[user.field]) {
      result[user.field].push(user);
    } else {
      result[user.field] = [user];
    }
    return result;
  }, {});

  const fieldNames = Object.keys(users);
  const currentFieldName = fieldNames[current];

  const { length } = Object.keys(users);

  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const back = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const UserList = users[currentFieldName].map((user: any) => (
    <S.List key={user.id} onClick={() => setModal({ data: user })}>
      <S.Title>{user.name}</S.Title>
      <S.Text>{user.devExp}</S.Text>
      <S.Stack>
        {user.skills.map((skill: any) => (
          <S.Stacklist key={skill}>{skill}</S.Stacklist>
        ))}
      </S.Stack>
      <S.Text>{user.outline}</S.Text>
      <S.Team>{user.team}</S.Team>
    </S.List>
  ));

  const renderModal = () => {
    const onCloseModal = () => setModal({});

    return (
      modal.data && (
        <PersonalDetailModal data={modal.data} onCloseModal={onCloseModal} />
      )
    );
  };
  return (
    <BaseTemplate Modal={renderModal()} closeModal={() => setModal({})}>
      <S.Container>
        <S.Top>
          <S.Main>초대 보관함</S.Main>
        </S.Top>
        <S.MailList></S.MailList>
      </S.Container>
    </BaseTemplate>
  );
};

export default Mail;

import React, { useState } from 'react';
import { getUser, listUser } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import BaseTemplate from 'page/BaseTemplate';
import PersonalDetailModal, {
  PersonalModalProps,
} from 'component/orgamisms/DetailModal/Personal';
import * as S from './style';

type ExtractType<O, K> = K extends keyof O ? O[K] : never;
type UserData = ExtractType<PersonalModalProps, 'data'>;

interface ModalState {
  type?: 'detail' | 'add';
  data?: UserData;
}

const PersonalDashboardPage = ({ className }: any) => {
  const [modal, setModal] = useState<ModalState>({});
  const [current, setCurrent] = useState<number>(0);

  const { data: userData } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const { loading, data } = useQuery(
    gql`
      ${listUser}
    `,
  );

  if (loading) {
    return (
      <S.LoadContainer>
        <S.LoadingComponent />
      </S.LoadContainer>
    );
  }

  const { items } = data.listUser;
  const users = items.reduce((obj: any, user: any) => {
    const result = { ...obj };
    if (user.surveyCompleted) {
      if (result[user.question[0].answers[0]]) {
        result[user.question[0].answers[0]].push(user);
      } else {
        result[user.question[0].answers[0]] = [user];
      }
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

  const Slider = (
    <S.Slider>
      <S.Button onClick={back}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 43 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.21201 20.8787C0.0404397 22.0502 0.0404395 23.9497 1.21201 25.1213L20.3039 44.2132C21.4755 45.3848 23.375 45.3848 24.5465 44.2132C25.7181 43.0416 25.7181 41.1421 24.5465 39.9706L7.57597 23L24.5465 6.02944C25.7181 4.85786 25.7181 2.95837 24.5465 1.78679C23.375 0.615221 21.4755 0.61522 20.3039 1.78679L1.21201 20.8787ZM40 20L3.33333 20L3.33333 26L40 26L40 20Z"
            fill="black"
          />
        </svg>
      </S.Button>
      <S.Field>{currentFieldName}</S.Field>
      <S.Button onClick={next}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 42 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42.6213 25.1213C43.7929 23.9497 43.7929 22.0503 42.6213 20.8787L23.5294 1.7868C22.3579 0.615223 20.4584 0.615223 19.2868 1.7868C18.1152 2.95837 18.1152 4.85786 19.2868 6.02944L36.2574 23L19.2868 39.9706C18.1152 41.1421 18.1152 43.0416 19.2868 44.2132C20.4584 45.3848 22.3579 45.3848 23.5294 44.2132L42.6213 25.1213ZM0.5 26L40.5 26V20L0.5 20L0.5 26Z"
            fill="black"
          />
        </svg>
      </S.Button>
    </S.Slider>
  );

  const UserList = users[currentFieldName]?.map((user: any) => (
    <S.List key={user.id} onClick={() => setModal({ data: user })}>
      <S.Username>{user.question[11].answers[0]}</S.Username>
      <S.StackList>
        {user.question[1].answers.length > 3
          ? user.question[1].answers
            .slice(0, 4)
            .fill('...', 3, 4)
            .map((skill: any) => <S.Stack key={skill}>{skill}</S.Stack>)
          : user.question[1].answers.map((skill: any) => (
            <S.Stack key={skill}>{skill}</S.Stack>
          ))}
      </S.StackList>
      <S.TeamState>
        <S.Text className="teamList">
          {user.teamList.length > 0
            ? user.teamList
              .slice(0, 2)
              .fill('...', 2, 3)
              .map((team: any, index: number) => {
                if (index === user.teamList.length - 1 || index === 1) {
                  return `${team.name}팀 소속`;
                }
                return `${team.name}팀, `;
              })
            : '소속된 팀 없음'}
        </S.Text>
        <S.PersonState text={user.personState} />
      </S.TeamState>
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

  const ClickerLoad = () => {
    if (userData) {
      if (userData.getUser.items[0].surveyCompleted) {
        return (
          <S.FloatingButton
            onClick={() => setModal({ data: userData.getUser.items[0] })}
          >
            내 정보
          </S.FloatingButton>
        );
      }
    }
    return <></>;
  };

  return (
    <BaseTemplate Modal={renderModal()} closeModal={() => setModal({})}>
      <ClickerLoad />
      <S.Container>
        <S.Top>
          <S.Main>매칭 대기열</S.Main>
          {Slider}
        </S.Top>
        <S.MatchPage className={className}>{UserList}</S.MatchPage>
      </S.Container>
    </BaseTemplate>
  );
};

export default PersonalDashboardPage;

import React, { useState } from 'react';
import { getTeamDashboard, listTeamDashboard, getUser } from 'graphql/queries';
import { gql, useQuery } from '@apollo/client';
import * as Personal from 'page/Dashboard/Personal/style';
import BaseTemplate from 'page/BaseTemplate';
import { useHistory } from 'react-router-dom';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import TeamDetailModal, {
  TeamModalProps,
} from 'component/orgamisms/DetailModal/Team';
import TeamAddForm from 'component/orgamisms/DetailModal/TeamAddForm';
import * as Team from './style';

type ExtractType<O, K> = K extends keyof O ? O[K] : never;
type TeamData = ExtractType<TeamModalProps, 'data'>;

interface ModalState {
  type?: 'detail' | 'add' | 'update';
  data?: TeamData;
}

const TeamDashboardPage = ({ className, isLoggedIn }: any) => {
  const history = useHistory();
  const [modal, setModal] = useState<ModalState>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => {});
  const { data: userData } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const { loading, data } = useQuery(
    gql`
      ${listTeamDashboard}
    `,
  );

  const { refetch } = useQuery(
    gql`
      ${getTeamDashboard}
    `,
    { skip: !userData?.getUser.items[0].id },
  );

  if (loading) {
    return (
      <Team.LoadContainer>
        <Team.LoadingComponent />
      </Team.LoadContainer>
    );
  }

  const { items } = data.listTeamDashboard;
  const teams = items.map((team: any) => {
    const skills = team.skills.length > 3
      ? team.skills
        .slice(0, 4)
        .fill('...', 3, 4)
        .map((skill: string) => (
          <Team.Stacklist key={skill}>{skill}</Team.Stacklist>
        ))
      : team.skills.map((skill: string) => (
        <Team.Stacklist key={skill}>{skill}</Team.Stacklist>
      ));

    const contents = team.contents.map((content: any) => (
      <Team.Text key={content.title}>
        <Team.Title>{content.title}</Team.Title>
        <Team.ContentInfo>{content.text}</Team.ContentInfo>
      </Team.Text>
    ));

    return (
      <Team.List
        key={team.name}
        onClick={() => setModal({ type: 'detail', data: team })}
      >
        <Team.Left>
          <Team.Name>{team.name}</Team.Name>
          <Team.Stack>{skills}</Team.Stack>
          <Team.Content>{contents}</Team.Content>
        </Team.Left>
        <Team.State text={team.state} />
      </Team.List>
    );
  });

  const renderModal = () => {
    const onCloseModal = () => setModal({});

    const onClickUpdate = async () => {
      const res = await refetch({ id: userData.getUser.items[0].id });
      if (modal?.type === 'update') {
        setModal({ type: 'detail', data: res?.data.getTeamDashboard });
      } else {
        setModal({ type: 'update', data: res?.data.getTeamDashboard });
      }
    };

    switch (modal?.type) {
      case 'detail':
        return (
          <TeamDetailModal
            data={modal.data}
            onCloseModal={onCloseModal}
            onClickUpdate={onClickUpdate}
          />
        );
      case 'add':
        return (
          <TeamAddForm
            onCloseModal={onCloseModal}
            onClickUpdate={onClickUpdate}
          />
        );
      case 'update':
        return (
          <TeamAddForm
            data={modal.data}
            onCloseModal={onCloseModal}
            onClickUpdate={onClickUpdate}
          />
        );
      default:
        return '';
    }
  };

  const ClickerLoad = () => {
    if (userData) {
      if (userData.getUser.items[0].haveTeam) {
        return (
          <Team.FloatingButton
            onClick={async () => {
              const res = await refetch({ id: userData.getUser.items[0].id });
              setModal({ type: 'detail', data: res?.data.getTeamDashboard });
            }}
          >
            나의 팀
          </Team.FloatingButton>
        );
      }
    }
    return <></>;
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickMakeTeam = () => {
    if (userData.getUser.items[0].surveyCompleted) {
      setModal({ type: 'add' });
      return;
    }
    openModal();
    setConfirmText(
      '설문을 완료한 후 팀생성이 가능합니다. 확인을 누르면 설문조사 화면으로 넘어갑니다.',
    );
    setConfirmFunction(() => () => {
      history.push('/survey');
    });
  };

  return (
    <BaseTemplate Modal={renderModal()} closeModal={() => setModal({})}>
      <ClickerLoad />
      <Personal.Container className={className}>
        <Personal.Top>
          <Team.Main>팀 현황판</Team.Main>
        </Personal.Top>
        <Team.TeamPage>{teams}</Team.TeamPage>
        {isLoggedIn && (
          <Team.CreateBtn onClick={onClickMakeTeam}>팀 생성하기</Team.CreateBtn>
        )}
      </Personal.Container>
      {modalOpen && (
        <ConfirmModal
          text={confirmText}
          close={closeModal}
          onClickConfirm={confirmFunction}
        />
      )}
    </BaseTemplate>
  );
};

export default TeamDashboardPage;

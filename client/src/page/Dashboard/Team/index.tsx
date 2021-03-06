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
  const [showMyTeams, setShowMyTeams] = useState<boolean>(false);

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
    { skip: !userData?.getUser.items[0]?.id },
  );

  if (loading) {
    return (
      <Team.LoadContainer>
        <Team.LoadingComponent />
      </Team.LoadContainer>
    );
  }

  const { items } = data.listTeamDashboard;
  const skills = (team: any) =>
    (team.skills.length > 3
      ? team.skills
        .slice(0, 4)
        .fill('...', 3, 4)
        .map((skill: string) => (
          <Team.Stacklist key={skill}>{skill}</Team.Stacklist>
        ))
      : team.skills.map((skill: string) => (
        <Team.Stacklist key={skill}>{skill}</Team.Stacklist>
      )));

  const contents = (team: any) =>
    team.contents.map((content: any) => (
      <Team.Text key={content.title}>
        <Team.Title>{content.title}</Team.Title>
        <Team.ContentInfo>{content.text}</Team.ContentInfo>
      </Team.Text>
    ));

  const myTeamsIds = userData?.getUser.items[0]?.teamList.map(
    (el: any) => el.id,
  );
  const myTeams = myTeamsIds?.length === 0 ? (
    <Team.Title>????????? ?????? ????????????.</Team.Title>
  ) : (
    items
      .filter((team: any) => {
        if (myTeamsIds?.includes(team.id)) {
          return true;
        }
        return false;
      })
      .map((team: any) => (
        <Team.List
          key={team.name}
          onClick={() => setModal({ type: 'detail', data: team })}
        >
          <Team.Left>
            <Team.Name>{team.name}</Team.Name>
            <Team.Stack>{skills(team)}</Team.Stack>
            <Team.Content>{contents(team)}</Team.Content>
          </Team.Left>
          <Team.State text={team.state} />
        </Team.List>
      ))
  );

  const teams = items.map((team: any) => (
    <Team.List
      key={team.name}
      onClick={() => setModal({ type: 'detail', data: team })}
    >
      <Team.Left>
        <Team.Name>{team.name}</Team.Name>
        <Team.Stack>{skills(team)}</Team.Stack>
        <Team.Content>{contents(team)}</Team.Content>
      </Team.Left>
      <Team.State text={team.state} />
    </Team.List>
  ));

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
      if (userData.getUser.items[0]?.haveTeam) {
        return (
          <Team.FloatingButton
            onClick={async () => {
              const res = await refetch({ id: userData.getUser.items[0].id });
              setModal({ type: 'detail', data: res?.data.getTeamDashboard });
            }}
          >
            ?????? ???
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
    if (userData.getUser.items[0]?.surveyCompleted) {
      setModal({ type: 'add' });
      return;
    }
    openModal();
    setConfirmText(
      '????????? ????????? ??? ???????????? ???????????????. ????????? ????????? ???????????? ???????????? ???????????????.',
    );
    setConfirmFunction(() => () => {
      history.push('/survey');
    });
  };

  const onClickShowMyTeam = () => {
    if (!showMyTeams) {
      setShowMyTeams(true);
    } else {
      setShowMyTeams(false);
    }
  };

  return (
    <BaseTemplate Modal={renderModal()} closeModal={() => setModal({})}>
      <ClickerLoad />
      <Personal.Container className={className}>
        <Personal.Top>
          <Team.Main>??? ?????????</Team.Main>
        </Personal.Top>
        <Team.TeamPage>{!showMyTeams ? teams : myTeams}</Team.TeamPage>
        {isLoggedIn && (
          <Team.ButtonWrapper>
            <Team.Button onClick={onClickMakeTeam}>??? ????????????</Team.Button>
            <Team.Button onClick={onClickShowMyTeam}>
              {!showMyTeams ? '?????? ?????? ??? ??????' : '?????? ??? ??????'}
            </Team.Button>
          </Team.ButtonWrapper>
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

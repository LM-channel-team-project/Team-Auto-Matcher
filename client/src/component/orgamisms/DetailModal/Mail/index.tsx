import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { UPDATE_TEAM, UPDATE_USER } from 'graphql/mutations';
import { GET_TEAM_DASHBOARD, GET_USER, GET_USER_BY_ID } from 'graphql/queries';
import makeObjectShorten from 'utils/makeObjectShorten';

import ConfirmModal from 'component/orgamisms/ConfirmModal';
import { TeamListType } from 'types';
import { skillsLabel } from 'style/preset';
import DetailModalTemplate from '../template';
import * as S from '../style';

export interface MailModalProps {
  className?: string;
  data: {
    from: string;
    teamName: string;
    teamId: string;
    type: string;
    date: Date;
  };
  onCloseModal: () => void;
}

const MailDetailModal = ({ className, data, onCloseModal }: MailModalProps) => {
  const { data: userData, refetch } = useQuery(GET_USER);
  const { data: teamData } = useQuery(GET_TEAM_DASHBOARD,
    {
      variables: { id: data?.teamId },
    });
  const { data: userDataById } = useQuery(GET_USER_BY_ID,
    {
      variables: { id: data?.from },
    });
  const [updateUserData] = useMutation(UPDATE_USER);
  const [updateTeamData] = useMutation(UPDATE_TEAM);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => { });
  const modalHeader = () => {
    if (userDataById && teamData) {
      const thatUserItems = userDataById.getUserById;
      const teamItems = teamData.getTeamDashboard;
      if (data?.type === 'invite') {
        return (
          <>
            <S.State text={teamItems.state || ''} />
            <S.Title type="team">{teamItems.name}</S.Title>
            <S.Desc>{teamItems.outline}</S.Desc>
          </>
        );
      }
      if (data?.type === 'apply') {
        return (
          <>
            <S.Domain>{thatUserItems.question[0].answers[0]}</S.Domain>
            <S.Title type="personal">
              {thatUserItems.question[11].answers[0]}
            </S.Title>
            <S.Desc>{thatUserItems.question[10].answers[0]}</S.Desc>
          </>
        );
      }
      const Msg = (message: string) => (
        <S.Title type="personal">{`${thatUserItems.question[11].answers[0] == null
          || teamItems?.name == null
          ? '삭제 메시지'
          : message
        }`}</S.Title>
      );
      if (data?.type === 'refuse') {
        return Msg('거절 메시지');
      }
      if (data?.type === 'accept') {
        return Msg('승인 메시지');
      }
    }
    return <S.Title type="personal">로딩중</S.Title>;
  };

  const renderContents = () => {
    if (userDataById && teamData) {
      const teamItems = teamData.getTeamDashboard;
      const thatUserItems = userDataById.getUserById;
      if (data?.type === 'invite') {
        const skills = teamItems.skills.map((skill: string) => {
          const skillName = Object.keys(skillsLabel).find(
            (name) => name.toLowerCase() === skill.toLowerCase(),
          );
          return (
            <S.TextLabel
              className="dc-label"
              text={skill}
              color={skillsLabel[String(skillName)]}
            />
          );
        });
        const people = teamItems.people.map((person: TeamListType) => (
          <S.Text className="people">{person.name}</S.Text>
        ));
        const inlineContents = (
          <>
            <S.ContentItem>
              <S.InlineContent title="구성원" className="ci-people">
                {people}
              </S.InlineContent>
            </S.ContentItem>
            <S.ContentItem>
              <S.InlineContent title="기술 스택" className="ci-skill">
                {skills}
              </S.InlineContent>
            </S.ContentItem>
          </>
        );
        const blockContents = teamItems.contents.map((content: any) => (
          <S.ContentItem>
            <S.BlockContent title={content.title} className="ci-block">
              <S.Paragraph>{content.text}</S.Paragraph>
            </S.BlockContent>
          </S.ContentItem>
        ));
        return (
          <>
            <S.ContentsList>{inlineContents}</S.ContentsList>
            <S.ContentsList>{blockContents}</S.ContentsList>
          </>
        );
      }
      if (data?.type === 'apply') {
        const skills = thatUserItems.question[1].answers?.map(
          (skill: string) => {
            const skillName = Object.keys(skillsLabel).find(
              (name) => name.toLowerCase() === skill.toLowerCase(),
            );
            return (
              <S.TextLabel
                key={skill}
                className="dc-label"
                text={skill}
                color={skillsLabel[String(skillName)]}
              />
            );
          },
        );
        const team = thatUserItems?.teamList.length > 0 ? (
          thatUserItems.teamList.map((aTeam: TeamListType) => (
            <S.Text className="team" key={aTeam.id}>
              {aTeam.name}
            </S.Text>
          ))
        ) : (
          <S.Text>팀 구하는 중</S.Text>
        );
        const inlineContents = (
          <>
            <S.ContentItem>
              <S.InlineContent title="소속한 팀" className="ci-people">
                {team}
              </S.InlineContent>
            </S.ContentItem>
            <S.ContentItem>
              <S.InlineContent title="기술 스택" className="ci-skill">
                {skills}
              </S.InlineContent>
              <S.InlineContent title="공부 기간">
                {thatUserItems.question[2].answers[0]}
              </S.InlineContent>
              <S.InlineContent title="활동 가능 기간">
                {thatUserItems.question[3].answers[0]}
              </S.InlineContent>
              {
                <S.InlineContent title="협업 가능 시간대">
                  {thatUserItems.question[4].answers?.map((time: any) => (
                    <S.Text key={time} className="ic-text">
                      {time}
                    </S.Text>
                  ))}
                </S.InlineContent>
              }
              <S.InlineContent title="진행 방식">
                {thatUserItems.question[5].answers[0]}
              </S.InlineContent>
              <S.InlineContent title="협업 경험">
                {thatUserItems.question[6].answers[0] ? '있음' : '없음'}
              </S.InlineContent>
              <S.InlineContent title="협업 시 중요하게 생각하는 것">
                {thatUserItems.question[7].answers?.map((item: any) => (
                  <S.Text key={item} className="ic-text">
                    {item}
                  </S.Text>
                ))}
              </S.InlineContent>
              <S.BlockContent
                title="계획하고 있는 프로젝트"
                className="ci-block"
              >
                <S.Paragraph>{thatUserItems.question[9].answers}</S.Paragraph>
              </S.BlockContent>
            </S.ContentItem>
          </>
        );
        const blockContents = (
          <>
            <S.ContentItem key={thatUserItems.question[8].title}>
              <S.BlockContent
                title={thatUserItems.question[8].title}
                className="ci-block"
              >
                <S.Paragraph>{thatUserItems.question[8].answers}</S.Paragraph>
              </S.BlockContent>
            </S.ContentItem>
          </>
        );
        return (
          <>
            <S.ContentsList>{inlineContents}</S.ContentsList>
            <S.ContentsList>{blockContents}</S.ContentsList>
          </>
        );
      }
      if (data?.type === 'refuse') {
        if (
          thatUserItems.question[11].answers[0] == null
          || teamItems?.name == null
        ) {
          return (
            <>
              <S.ContentsList>
                사용자나 팀이 삭제 되었습니다. <br />
                메시지를 삭제해 주세요.
              </S.ContentsList>
            </>
          );
        }
        return (
          <>
            <S.ContentsList>
              {thatUserItems.question[11].answers[0]}님께서
              <br />
              {teamItems.name}팀의 지원 / 초대를 거절하였습니다.
            </S.ContentsList>
          </>
        );
      }
      if (data?.type === 'accept') {
        if (
          thatUserItems.question[11].answers[0] == null
          || teamItems?.name == null
        ) {
          return (
            <>
              <S.ContentsList>
                사용자나 팀이 삭제 되었습니다. <br />
                메시지를 삭제해 주세요.
              </S.ContentsList>
            </>
          );
        }
        return (
          <>
            <S.ContentsList>
              {thatUserItems.question[11].answers[0]} 님께서 <br />
              {teamItems.name}팀의 지원 / 초대를 승인하였습니다.
              <br />
              github 닉네임 {thatUserItems.question[11].answers[0]} 님을
              <br />
              Team Auto Matcher github 혹은 slack에서 찾아 소통해주세요.
            </S.ContentsList>
          </>
        );
      }
    }
    return (
      <S.LoadingContent>
        <S.LoadingComponent />
        <S.ContentsList>
          로딩이 지속될 경우, 메시지를 삭제해주세요.
        </S.ContentsList>
      </S.LoadingContent>
    );
  };

  const beTeamMember = async () => {
    if (teamData && userDataById && userData && userData) {
      const teamItems = teamData.getTeamDashboard;
      const thatUserItems = userDataById.getUserById;
      const userItems = userData.getUser.items[0];
      const removeTypeFromPeople = teamItems.people.map((el: any) => ({
        id: el.id,
        name: el.name,
      }));
      const teamObject = {
        id: data?.teamId,
        people:
          data?.type === 'invite'
            ? [
              ...removeTypeFromPeople,
              {
                id: userItems.id,
                name: userItems.question[11].answers[0],
              },
            ]
            : [
              ...removeTypeFromPeople,
              {
                id: thatUserItems.id,
                name: thatUserItems.question[11].answers[0],
              },
            ],
      };
      const removeType = data?.type === 'invite'
        ? userItems.teamList.map((el: any) => ({
          id: el.id,
          name: el.name,
        }))
        : thatUserItems.teamList.map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
      const userObject = {
        id: data?.type === 'invite' ? userItems.id : data?.from,
        teamList: [
          ...removeType,
          { id: teamItems.id, name: data?.teamName },
        ],
      };
      await updateTeamData(makeObjectShorten(teamObject));
      await updateUserData(makeObjectShorten(userObject));
    }
  };

  const sendMessage = async (type: string) => {
    if (userDataById && userData) {
      const userItems = userData.getUser.items[0];
      const frontData = userDataById.getUserById.mail?.map((el: any) => ({
        from: el.from,
        teamId: el.teamId,
        type: el.type,
        teamName: el.teamName,
        date: el.date,
      }));
      const newMail = {
        from: userItems.id,
        teamId: data?.teamId,
        type,
        teamName: data?.teamName,
        date: new Date(),
      };
      const combinedData = [...frontData, newMail];
      const userObject = {
        id: data?.from,
        mail: combinedData,
      };

      await updateUserData(makeObjectShorten(userObject));
    }
  };

  const delMessage = async () => {
    if (userData) {
      const userItems = userData.getUser.items[0];
      const filteredMail = userItems.mail
        .filter((el: any) => (el.from !== data?.from
          || el.type !== data?.type
          || el.teamId !== data?.teamId
          || el.teamName !== data?.teamName))
        .map((el: any) => ({
          from: el.from,
          teamId: el.teamId,
          type: el.type,
          teamName: el.teamName,
          date: el.date,
        }));
      const userObject = {
        id: userItems.id,
        mail: filteredMail,
      };
      await updateUserData(makeObjectShorten(userObject));
      await refetch();
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const closeModals = () => {
    closeModal();
    onCloseModal();
  };

  const onClickAccept = async () => {
    openModal();
    if (data?.type === 'invite') {
      setConfirmText(
        '확인을 누르면 팀으로 등록이 완료됩니다. 팀오토매쳐 slack으로 입장해, 팀장의 연락을 기다려주세요.',
      );
    } else {
      setConfirmText(
        '확인을 누르면 사용자가 팀으로 등록이 완료됩니다. 팀오토매쳐 slack으로 입장해, 팀원과 소통해주세요.',
      );
    }
    const confirmAccept = async () => {
      await beTeamMember();
      await sendMessage('accept');
      await delMessage();
      closeModals();
    };
    setConfirmFunction(() => confirmAccept);
  };

  const onClickRefuse = async () => {
    openModal();
    setConfirmText('확인을 누르면 거절이 완료되며 메시지가 삭제됩니다.');
    const confirmRefuse = async () => {
      await sendMessage('refuse');
      await delMessage();
      closeModals();
    };
    setConfirmFunction(() => confirmRefuse);
  };

  const onClickDelete = async () => {
    openModal();
    setConfirmText('확인을 누르면 메시지가 삭제됩니다.');
    const confirmDelete = async () => {
      await delMessage();
      closeModals();
    };
    setConfirmFunction(() => confirmDelete);
  };

  const modalButton = () => {
    if (userDataById && teamData) {
      if (
        data?.type === 'accept'
        || data?.type === 'refuse'
      ) {
        return (
          <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
            메시지 삭제
          </S.SubmitButton>
        );
      }
      return (
        <>
          <S.SubmitButton size="medium" color="yellow" onClick={onClickAccept}>
            수락하기
          </S.SubmitButton>
          <span style={{ marginRight: '2rem' }}></span>
          <S.SubmitButton size="medium" color="gray" onClick={onClickRefuse}>
            거절하기
          </S.SubmitButton>
        </>
      );
    }
    return (
      <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
        메시지 삭제
      </S.SubmitButton>
    );
  };

  return data ? (
    <>
      <DetailModalTemplate
        modalHeader={modalHeader()}
        modalBody={renderContents()}
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

export default MailDetailModal;

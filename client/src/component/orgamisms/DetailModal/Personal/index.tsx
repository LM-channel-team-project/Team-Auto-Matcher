import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { UPDATE_TEAM, UPDATE_USER } from 'graphql/mutations';
import {
  GET_TEAM_DASHBOARD,
  GET_USER,
  GET_USER_BY_ID,
  LIST_USER,
} from 'graphql/queries';
import makeTeamIdByUserId from 'utils/setTeamId';
import makeObjectShorten from 'utils/makeObjectShorten';

import ConfirmModal from 'component/orgamisms/ConfirmModal';
import { skillsLabel } from 'style/preset';
import DetailModalTemplate, { MailType, QuestionItem, TeamListType } from '../template';
import * as S from '../style';

export interface PersonalModalProps {
  data: {
    id: string;
    haveTeam: boolean;
    surveyCompleted: boolean;
    question: QuestionItem[];
    personState: string;
    teamList: TeamListType[];
    mail: MailType[];
  };
  onCloseModal: () => void;
}

const PersonalDetailModal = ({ data, onCloseModal }: PersonalModalProps) => {
  const history = useHistory();
  const { data: userData, refetch } = useQuery(GET_USER);
  const { refetch: listUserRefetch } = useQuery(LIST_USER);
  const { data: userIdData } = useQuery(GET_USER_BY_ID,
    {
      variables: { id: data?.id },
    });

  const { data: teamData, refetch: teamRefetch } = useQuery(GET_TEAM_DASHBOARD,
    {
      variables: { id: userData && makeTeamIdByUserId(userData.getUser.items[0]?.id) },
    });
  const [updateUserData] = useMutation(UPDATE_USER);
  const [updateTeamData] = useMutation(UPDATE_TEAM);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => { });
  const [personState, setPersonState] = useState<string>(
    data?.personState || '',
  );
  const [isInTeam, setIsInTeam] = useState<boolean>(false);

  useEffect(() => {
    data?.teamList.forEach((el: any) => {
      if (el.id === makeTeamIdByUserId(userData?.getUser.items[0]?.id)) {
        setIsInTeam(true);
      }
    });
  }, [userData]);

  const renderContents = () => {
    const skills = data.question[1].answers?.map((skill: string) => {
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
    });

    const team = data?.teamList.length > 0 ? (
      data.teamList.map((aTeam: TeamListType) => (
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
            {data.question[2].answers[0]}
          </S.InlineContent>
          <S.InlineContent title="활동 가능 기간">
            {data.question[3].answers[0]}
          </S.InlineContent>
          {
            <S.InlineContent title="협업 가능 시간대">
              {data.question[4].answers?.map((time: any) => (
                <S.Text key={time} className="ic-text">
                  {time}
                </S.Text>
              ))}
            </S.InlineContent>
          }
          <S.InlineContent title="진행 방식">
            {data.question[5].answers[0]}
          </S.InlineContent>
          <S.InlineContent title="협업 경험">
            {data.question[6].answers[0] ? '있음' : '없음'}
          </S.InlineContent>
          <S.InlineContent title="협업 시 중요하게 생각하는 것">
            {data.question[7].answers?.map((item: any) => (
              <S.Text key={item} className="ic-text">
                {item}
              </S.Text>
            ))}
          </S.InlineContent>
          <S.BlockContent title="계획하고 있는 프로젝트" className="ci-block">
            <S.Paragraph>{data.question[9].answers}</S.Paragraph>
          </S.BlockContent>
        </S.ContentItem>
      </>
    );

    const blockContents = (
      <>
        <S.ContentItem key={data.question[8].title}>
          <S.BlockContent title={data.question[8].title} className="ci-block">
            <S.Paragraph>{data.question[8].answers}</S.Paragraph>
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
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickInvite = async () => {
    if (userData && userIdData && teamData) {
      const confirmInvite = async () => {
        const userItems = userData.getUser.items[0];
        const teamItems = teamData.getTeamDashboard;
        if (!userItems.haveTeam) {
          setConfirmText(
            '당신이 팀장으로 있는 팀이 없습니다. 확인을 누르면 팀 생성을 위한 페이지로 이동됩니다.',
          );
          setConfirmFunction(() => () => {
            history.push('/dashboard/team');
          });
          return;
        }
        let isDuplicate = false;
        const frontData = userIdData.getUserById.mail
          .map((el: any) => {
            if (
              el.from === userData?.getUser.items[0].id
              && el.type === 'invite'
            ) {
              isDuplicate = true;
            }
            return ({
              from: el.from,
              teamId: el.teamId,
              type: el.type,
              teamName: el.teamName,
            });
          });
        if (isDuplicate) {
          setConfirmText('이미 초대한 사용자입니다.');
          setConfirmFunction(() => closeModal);
          return;
        }
        const changeIntoSet = new Set(frontData);
        const changeIntoArray = Array.from(changeIntoSet);
        const newData = {
          from: userItems.id,
          teamId: teamItems.id,
          type: 'invite',
          teamName: teamItems.name,
          date: new Date(),
        };
        const combinedData = [...changeIntoArray, newData];
        const userObject = {
          id: data?.id,
          mail: combinedData,
        };
        await updateUserData(makeObjectShorten(userObject));
        await refetch();
        onCloseModal();
        closeModal();
      };
      openModal();
      setConfirmText('확인을 누르면 초대가 완료됩니다.');
      setConfirmFunction(() => confirmInvite);
    }
  };

  const onClickDelete = () => {
    if (userData) {
      const deleteConfirm = async () => {
        const userObject = {
          id: userData.getUser.items[0].id,
          surveyCompleted: false,
          personState: '팀 구하는 중',
        };
        await updateUserData(makeObjectShorten(userObject));
        await refetch();
        await listUserRefetch();
        onCloseModal();
        closeModal();
      };
      openModal();
      setConfirmText(
        '확인을 누르면 삭제가 완료됩니다. 삭제 완료 후, 다시 등록하려면 설문을 다시 진행해주세요.',
      );
      setConfirmFunction(() => deleteConfirm);
    }
  };

  const onClickState = () => {
    if (personState === '팀 구하는 중') {
      setPersonState('팀장');
    } else if (personState === '팀장') {
      setPersonState('종료');
    } else {
      setPersonState('팀 구하는 중');
    }
  };
  useEffect(() => {
    if (data?.id === userData?.getUser.items[0]?.id) {
      const updatePersonState = async () => {
        const userObject = {
          id: userData?.getUser.items[0].id,
          personState,
        };
        await updateUserData(makeObjectShorten(userObject));
        await refetch();
      };
      updatePersonState();
    }
  }, [personState]);

  const onClickOut = () => {
    const confirmOut = async () => {
      const userItems = userData?.getUser.items[0];
      const teamFilter = data?.teamList
        .filter((el: any) => {
          if (el.id === makeTeamIdByUserId(userItems.id)) {
            return false;
          }
          return true;
        })
        .map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
      const peopleFilter = teamData.getTeamDashboard.people
        .filter((el: any) => {
          if (el.id === data?.id) {
            return false;
          }
          return true;
        })
        .map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
      const userObject = {
        id: data?.id,
        teamList: teamFilter,
      };
      const teamObject = {
        id: makeTeamIdByUserId(userItems.id),
        people: peopleFilter,
      };
      await updateUserData(makeObjectShorten(userObject));
      await updateTeamData(makeObjectShorten(teamObject));
      await listUserRefetch();
      await teamRefetch();
      onCloseModal();
      closeModal();
    };
    openModal();
    setConfirmText('확인을 누르면 해당 유저를 팀에서 내보냅니다.');
    setConfirmFunction(() => confirmOut);
  };

  const modalButton = () => {
    if (isInTeam && data?.id !== userData?.getUser.items[0].id) {
      return (
        <S.SubmitButton size="medium" color="red" onClick={onClickOut}>
          팀 내보내기
        </S.SubmitButton>
      );
    }
    if (data?.id !== userData?.getUser.items[0]?.id && userData?.getUser) {
      if (data?.personState !== '종료') {
        return (
          <S.SubmitButton size="medium" color="yellow" onClick={onClickInvite}>
            초대하기
          </S.SubmitButton>
        );
      }
      return <></>;
    }
    if (data?.id === userData?.getUser.items[0]?.id) {
      return (
        <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
          삭제하기
        </S.SubmitButton>
      );
    }
    return <></>;
  };

  return data ? (
    <>
      <DetailModalTemplate
        modalHeader={
          <>
            {userData
              && (data?.id === userData.getUser.items[0]?.id ? (
                <S.ClickPersonState onClick={onClickState} text={personState} />
              ) : (
                <S.PersonState text={personState} />
              ))}
            <S.Domain>{data.question[0].answers[0]}</S.Domain>
            <S.Title type="personal">{data.question[11].answers[0]}</S.Title>
            <S.Desc>{data.question[10].answers[0]}</S.Desc>
          </>
        }
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

export default PersonalDetailModal;

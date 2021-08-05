import React, { useState, useEffect } from 'react';
import { skillsLabel } from 'style/preset';
import {
  getUser,
  getUserById,
  getTeamDashboard,
  listPersonDashboard,
} from 'graphql/queries';
import { useHistory } from 'react-router-dom';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import { gql, useQuery, useMutation } from '@apollo/client';
import { updateUser, deletePerson, updatePerson } from 'graphql/mutations';
import DetailModalTemplate, { ContentItem } from '../template';
import * as S from '../style';

export interface PersonalModalProps {
  data: {
    id: string;
    name: string;
    outline: string;
    field: string;
    skills: string[];
    team: string[];
    devExp?: string;
    periods?: string;
    times?: string[];
    contact?: string;
    hasCoWork?: boolean;
    priority?: string[];
    project?: string;
    contents: ContentItem[];
    personState: string;
  };
  userId?: string;
  haveTeam?: boolean;
  onCloseModal: () => void;
}

const PersonalDetailModal = ({
  data,
  onCloseModal,
  userId,
  haveTeam,
}: PersonalModalProps) => {
  const history = useHistory();
  const { refetch } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const { data: userIdData } = useQuery(
    gql`
      ${getUserById}
    `,
    {
      variables: { id: data?.id },
    },
  );

  const { data: teamData } = useQuery(
    gql`
      ${getTeamDashboard}
    `,
    {
      variables: { id: userId && userId },
    },
  );

  const [updateUserData] = useMutation(
    gql`
      ${updateUser}
    `,
  );

  const [updatePersonData] = useMutation(
    gql`
      ${updatePerson}
    `,
  );

  const [DeletePersonData] = useMutation(
    gql`
      ${deletePerson}
    `,
  );

  const { refetch: personRefetch } = useQuery(
    gql`
      ${listPersonDashboard}
    `,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => {});
  const [personState, setPersonState] = useState<string>(
    data?.personState || '',
  );

  const renderContents = () => {
    const skills = data.skills.map((skill: string) => {
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

    const team = data.team.map((aTeam: string) => (
      <S.Text className="team" key={aTeam}>
        {aTeam}
      </S.Text>
    ));

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
          <S.InlineContent title="공부 기간">{data.devExp}</S.InlineContent>
          <S.InlineContent title="활동 가능 기간">
            {data.periods}
          </S.InlineContent>
          {
            <S.InlineContent title="협업 가능 시간대">
              {data.times?.map((time: any) => (
                <S.Text key={time} className="ic-text">
                  {time}
                </S.Text>
              ))}
            </S.InlineContent>
          }
          <S.InlineContent title="진행 방식">{data.contact}</S.InlineContent>
          <S.InlineContent title="협업 경험">
            {data.hasCoWork ? '있음' : '없음'}
          </S.InlineContent>
          <S.InlineContent title="협업 시 중요하게 생각하는 것">
            {data.priority?.map((item: any) => (
              <S.Text key={item} className="ic-text">
                {item}
              </S.Text>
            ))}
          </S.InlineContent>
          <S.BlockContent title="계획하고 있는 프로젝트" className="ci-block">
            <S.Paragraph>{data.project}</S.Paragraph>
          </S.BlockContent>
        </S.ContentItem>
      </>
    );

    const blockContents = data!.contents.map((content: any) => (
      <S.ContentItem key={content.title}>
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
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickInvite = async () => {
    const confirmInvite = async () => {
      if (!haveTeam) {
        setConfirmText(
          '당신이 팀장으로 있는 팀이 없습니다. 확인을 누르면 팀 생성을 위한 페이지로 이동됩니다.',
        );
        setConfirmFunction(() => () => {
          history.push('/dashboard/team');
        });
        return;
      }
      if (userIdData && teamData) {
        let isDuplicate = false;
        const frontData = userIdData.getUserById.mail
          .filter((el: any) => {
            if (el.from === userId && el.type === 'invite') {
              isDuplicate = true;
            }
            return true;
          })
          .map((el: any) => ({
            from: el.from,
            teamId: el.teamId,
            type: el.type,
            teamName: el.teamName,
          }));
        if (isDuplicate) {
          setConfirmText('이미 초대한 사용자입니다.');
          setConfirmFunction(() => closeModal);
          return;
        }
        const changeIntoSet = new Set(frontData);
        const changeIntoArray = Array.from(changeIntoSet);
        const newData = {
          from: userId,
          teamId: teamData.getTeamDashboard.id,
          type: 'invite',
          teamName: teamData.getTeamDashboard.name,
        };
        const combinedData = [...changeIntoArray, newData];
        await updateUserData({
          variables: {
            input: {
              id: data?.id,
              mail: combinedData,
            },
          },
        });
        await refetch();
        onCloseModal();
        closeModal();
      }
    };
    openModal();
    setConfirmText('확인을 누르면 초대가 완료됩니다.');
    setConfirmFunction(() => confirmInvite);
  };

  const onClickDelete = () => {
    const deleteConfirm = async () => {
      await DeletePersonData({
        variables: {
          input: {
            id: userId,
          },
        },
      });
      const firstInput = Array(12).fill({ title: '', answers: [] });
      await updateUserData({
        variables: {
          input: {
            id: userId,
            surveyCompleted: false,
            question: firstInput,
          },
        },
      });
      await personRefetch();
      await refetch();
      onCloseModal();
      closeModal();
    };
    openModal();
    setConfirmText(
      '확인을 누르면 삭제가 완료됩니다. 삭제 완료 후, 다시 등록하려면 설문을 다시 진행해주세요.',
    );
    setConfirmFunction(() => deleteConfirm);
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
    if (data?.id === userId) {
      const updatePersonState = async () => {
        await updatePersonData({
          variables: {
            input: {
              id: userId,
              personState,
            },
          },
        });
        await personRefetch();
      };
      updatePersonState();
    }
  }, [personState]);

  return data ? (
    <>
      <DetailModalTemplate
        modalHeader={
          <>
            {userId
              && (data?.id === userId ? (
                <S.ClickPersonState onClick={onClickState} text={personState} />
              ) : (
                <S.PersonState text={personState} />
              ))}
            <S.Domain>{data.field}</S.Domain>
            <S.Title type="personal">{data.name}</S.Title>
            <S.Desc>{data.outline}</S.Desc>
          </>
        }
        modalBody={renderContents()}
        modalButton={
          userId
          && (data?.id !== userId ? (
            data?.personState !== '종료' && (
              <S.SubmitButton
                size="medium"
                color="yellow"
                onClick={onClickInvite}
              >
                초대하기
              </S.SubmitButton>
            )
          ) : (
            <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
              삭제하기
            </S.SubmitButton>
          ))
        }
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

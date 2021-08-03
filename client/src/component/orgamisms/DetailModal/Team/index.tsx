import React, { useState } from 'react';
import { skillsLabel } from 'style/preset';
import { getUser, getUserById, listTeamDashboard } from 'graphql/queries';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import { gql, useQuery, useMutation } from '@apollo/client';
import { updateUser, deleteTeam } from 'graphql/mutations';
import DetailModalTemplate, { ContentItem } from '../template';
import * as S from '../style';

export interface TeamModalProps {
  data?: {
    id: string;
    name: string;
    people: string[];
    outline: string;
    contents: ContentItem[];
    skills: string[];
    state: string;
    owner: string;
  };
  userId?: string;
  onCloseModal: () => void;
  onClickUpdate: () => void;
}

const TeamDetailModal = ({
  data,
  userId,
  onCloseModal,
  onClickUpdate,
}: TeamModalProps) => {
  const { refetch } = useQuery(
    gql`
      ${getUser}
    `,
  );
  const { refetch: teamRefetch } = useQuery(
    gql`
      ${listTeamDashboard}
    `,
  );

  const { data: userIdData } = useQuery(
    gql`
      ${getUserById}
    `,
    {
      variables: { id: data?.owner },
    },
  );

  const [updateUserData] = useMutation(
    gql`
      ${updateUser}
    `,
  );

  const [deleteTeamData] = useMutation(
    gql`
      ${deleteTeam}
    `,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => {});

  const renderContents = () => {
    const skills = data?.skills.map((skill: string) => {
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

    const people = data?.people.map((person: string) => (
      <S.Text className="people">{person}</S.Text>
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

    const blockContents = data?.contents.map((content: any) => (
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
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickApply = async () => {
    const confirmApply = async () => {
      let isDuplicated = false;
      const frontData = userIdData.getUserById.mail
        .filter((el: any) => {
          if (el.from === userId && el.type === 'apply') {
            isDuplicated = true;
          }
          return true;
        })
        .map((el: any) => ({
          from: el.from,
          teamId: el.teamId,
          type: el.type,
          teamName: el.teamName,
        }));
      if (isDuplicated) {
        setConfirmText('이미 동일한 팀에 지원하였습니다.');
        setConfirmFunction(() => closeModal);
        return;
      }
      const changeIntoSet = new Set(frontData);
      const changeIntoArray = Array.from(changeIntoSet);
      const newData = {
        from: userId,
        teamId: data?.id,
        type: 'apply',
        teamName: data?.name,
      };
      const combinedData = [...changeIntoArray, newData];
      await updateUserData({
        variables: {
          input: {
            id: data?.owner,
            mail: combinedData,
          },
        },
      });
      await refetch();
      onCloseModal();
      closeModal();
    };
    openModal();
    setConfirmText('확인을 누르면 지원이 완료됩니다.');
    setConfirmFunction(() => confirmApply);
  };
  const onClickDelete = () => {
    const deleteConfirm = async () => {
      await deleteTeamData({
        variables: {
          input: {
            id: data?.owner,
          },
        },
      });
      await updateUserData({
        variables: {
          input: {
            id: data?.owner,
            haveTeam: false,
          },
        },
      });
      await teamRefetch();
      await refetch();
      onCloseModal();
      closeModal();
    };
    openModal();
    setConfirmText('확인을 누르면 삭제가 완료됩니다.');
    setConfirmFunction(() => deleteConfirm);
  };

  return (
    <>
      <DetailModalTemplate
        modalHeader={
          <>
            <S.State text={data?.state || ''} />
            <S.Title type="team">{data?.name}</S.Title>
            <S.Desc>{data?.outline}</S.Desc>
          </>
        }
        modalBody={renderContents()}
        modalButton={
          userId
          && (data?.owner !== userId ? (
            data?.state === '모집중' && (
              <S.SubmitButton
                size="medium"
                color="yellow"
                onClick={onClickApply}
              >
                지원하기
              </S.SubmitButton>
            )
          ) : (
            <>
              <S.SubmitButton
                size="medium"
                color="yellow"
                onClick={onClickUpdate}
              >
                업데이트
              </S.SubmitButton>
              <S.SpaceSpan />
              <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
                팀 삭제하기
              </S.SubmitButton>
            </>
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
  );
};

export default TeamDetailModal;

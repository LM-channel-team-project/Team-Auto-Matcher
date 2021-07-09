import React from 'react';
import { skillsLabel } from 'style/preset';
import { getUser, getUserById } from 'graphql/queries';
import { gql, useQuery, useMutation } from '@apollo/client';
import { updateUser } from 'graphql/mutations';
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
  onCloseModal: () => void;
}

const TeamDetailModal = ({ data, onCloseModal }: TeamModalProps) => {
  const { data: userData, refetch } = useQuery(
    gql`
      ${getUser}
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

  const onClickApply = () => {
    const getUserData = userData.getUser.items[0];
    if (data?.owner !== getUserData.id) {
      let isDuplicated = false;
      const frontData = userIdData.getUserById.mail
        .filter((el: any) => {
          if (el.from === getUserData.id && el.teamId === data?.id) {
            isDuplicated = true;
          }
          return false;
        })
        .map((el: any) => ({
          from: el.from,
          teamId: el.teamId,
          type: el.type,
          teamName: el.teamName,
        }));

      if (isDuplicated) {
        onCloseModal();
        alert('이미 동일한 팀에 지원하였습니다.');
        return;
      }
      const changeIntoSet = new Set(frontData);
      const changeIntoArray = Array.from(changeIntoSet);
      const newData = {
        from: getUserData.id,
        teamId: data?.id,
        type: 'apply',
        teamName: data?.name,
      };
      const combinedData = [...changeIntoArray, newData];
      updateUserData({
        variables: {
          input: {
            id: data?.owner,
            mail: combinedData,
          },
        },
      });
      refetch();
      onCloseModal();
      alert('지원이 완료되었습니다.');
    } else {
      alert('자신의 팀에는 지원할 수 없습니다');
    }
  };

  return (
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
        <S.SubmitButton size="medium" color="yellow" onClick={onClickApply}>
          지원하기
        </S.SubmitButton>
      }
      onCloseModal={onCloseModal}
    />
  );
};

export default TeamDetailModal;

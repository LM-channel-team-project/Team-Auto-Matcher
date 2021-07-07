import React from 'react';
import { skillsLabel } from 'style/preset';
import { getUser } from 'graphql/queries';
import { gql, useQuery, useMutation } from '@apollo/client';
import { updateUser, updateTeam } from 'graphql/mutations';
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
    mail: string[];
  };
  onCloseModal: () => void;
}

const TeamDetailModal = ({ data, onCloseModal }: TeamModalProps) => {
  const { data: userData, refetch } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const [updateUserData] = useMutation(
    gql`
      ${updateUser}
    `,
  );

  const [updateTeamData] = useMutation(
    gql`
      ${updateTeam}
    `,
  );

  const renderContents = () => {
    const skills = data?.skills.map((skill: string) => (
      <S.TextLabel
        className="dc-label"
        text={skill}
        color={skillsLabel[skill.toLowerCase()]}
      />
    ));

    const people = data?.people.map((person: string) => (
      <S.Text type="people">{person}</S.Text>
    ));

    const inlineContents = (
      <>
        <S.ContentItem>
          <S.InlineContent title="구성원" className="ci-people">
            {people}
          </S.InlineContent>
        </S.ContentItem>
        <S.ContentItem>
          <S.InlineContent title="기술 스택" className="ci-skills">
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
      let isDuplicate = false;
      const frontData = data?.mail
        .filter((el: any) => {
          if (el.from === getUserData.id) {
            isDuplicate = true;
          }
          return false;
        })
        .map((el: any) => ({
          from: el.from,
          name: el.name,
          outline: el.outline,
          field: el.field ? el.field : '',
          devExp: el.devExp ? el.devExp : '',
          skills: el.skills,
          contents: el.contents ? el.contents : [],
          state: el.state ? el.state : '',
        }));

      if (isDuplicate) {
        onCloseModal();
        alert('이미 동일한 팀에 지원하였습니다.');
        return;
      }
      const changeIntoSet = new Set(frontData);
      const changeIntoArray = Array.from(changeIntoSet);
      const newData = {
        from: getUserData.id,
        name: getUserData.question[11].answers[0],
        outline: getUserData.question[8].answers[0],
        field: getUserData.question[0].answers[0],
        devExp: getUserData.question[2].answers[0],
        skills: getUserData.question[1].answers,
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
      updateTeamData({
        variables: {
          input: {
            id: data?.id,
            mail: combinedData,
          },
        },
      });
      refetch();
      onCloseModal();
      alert('지원이 완료되었습니다.');
    } else {
      // 팀원에 내가 있는지
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

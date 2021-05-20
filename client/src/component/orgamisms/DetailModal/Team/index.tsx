import React from 'react';
import TextLabel from 'component/atoms/TextLabel';
import { skillsLabel } from 'style/preset';
import DetailModalTemplate from '../template';
import * as S from '../style';

type ContentItem = {
  title: string;
  text: string;
};

interface ITeamDetailModal {
  data: {
    id: string;
    name: string;
    people: string[];
    outline: string;
    contents: ContentItem[];
    skills: string[];
  };
  onCloseModal: () => void;
}

const TeamDetailModal = ({ data, onCloseModal }: ITeamDetailModal) => {
  const renderContents = () => {
    const skills = data.skills.map((skill: string) => (
      <TextLabel
        className="dc-label"
        text={skill}
        color={skillsLabel[skill.toLowerCase()]}
      />
    ));

    const people = data.people.map((person: string) => (
      <S.Text type="people">{person}</S.Text>
    ));

    const inlineContents = (
      <>
        <S.ContentItem>
          <S.InlineContent title="구성원" className="ci-inline">
            {people}
          </S.InlineContent>
        </S.ContentItem>
        <S.ContentItem>
          <S.InlineContent title="기술 스택" className="ci-inline">
            {skills}
          </S.InlineContent>
        </S.ContentItem>
      </>
    );

    const blockContents = data.contents.map((content: any) => (
      <S.ContentItem>
        <S.BlockContent title={content.title} className="ci-block">
          <S.Paragraph>{content.text}</S.Paragraph>
        </S.BlockContent>
      </S.ContentItem>
    ));

    return (
      <>
        <S.ContentsList>
          {inlineContents}
        </S.ContentsList>
        <S.ContentsList>
          {blockContents}
        </S.ContentsList>
      </>
    );
  };

  return (
    <DetailModalTemplate
      modalHeader={
        <>
          <S.Title type="team">{data.name}</S.Title>
          <S.Desc>{data.outline}</S.Desc>
        </>
      }
      modalBody={renderContents()}
      modalButton={<S.SubmitButton size="medium" color="yellow" onClick={() => {}}>지원하기</S.SubmitButton>}
      onCloseModal={onCloseModal}
    />
  );
};

export default TeamDetailModal;

import React from 'react';
import { skillsLabel } from 'style/preset';
import DetailModalTemplate, { ContentItem } from '../template';
import * as S from '../style';

interface IPersonalDetailModal {
  data: {
    id: string;
    name: string;
    outline: string;
    domain: string;
    skills: string[];
    team: string[];
    contents: ContentItem[];
  };
  onCloseModal: () => void;
}

const PersonalDetailModal = ({ data, onCloseModal }: IPersonalDetailModal) => {
  const renderContents = () => {
    const skills = data.skills.map((skill: string) => (
      <S.TextLabel key={skill} className="dc-label" text={skill} color={skillsLabel[skill.toLowerCase()]} />
    ));
    console.log(data);
    const team = data!.team.map((aTeam: string) => <S.Text key={aTeam}>{aTeam}</S.Text>);

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
    data ? <DetailModalTemplate
      modalHeader={
        <>
          <S.Domain>{data.domain}</S.Domain>
          <S.Title type="personal">{data.name}</S.Title>
          <S.Desc>{data.outline}</S.Desc>
        </>
      }
      modalBody={renderContents()}
      modalButton={<S.SubmitButton size="medium" color="yellow" onClick={() => {}}>초대하기</S.SubmitButton>}
      onCloseModal={onCloseModal}
    />
      : <div>error</div>
  );
};

export default PersonalDetailModal;

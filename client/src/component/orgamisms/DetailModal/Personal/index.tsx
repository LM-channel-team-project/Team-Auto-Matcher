import React from 'react';
import { skillsLabel } from 'style/preset';
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
    contents: ContentItem[];
  };
  onCloseModal: () => void;
}

const PersonalDetailModal = ({ data, onCloseModal }: PersonalModalProps) => {
  const renderContents = () => {
    const skills = data.skills.map((skill: string) => {
      const skillName = Object.keys(skillsLabel)
        .find((name) => name.toLowerCase() === skill.toLowerCase());
      return (
        <S.TextLabel key={skill} className="dc-label" text={skill} color={skillsLabel[String(skillName)]} />
      );
    });

    const team = data.team.map((aTeam: string) => <S.Text key={aTeam}>{aTeam}</S.Text>);

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
            {data.devExp}
          </S.InlineContent>
          <S.InlineContent title="활동 가능 기간">
            {data.periods}
          </S.InlineContent>
          {<S.InlineContent title="협업 가능 시간대">
            {data.times?.map((time) => <S.Text key={time} className="ic-text">{time}</S.Text>)}
          </S.InlineContent>}
          <S.InlineContent title="진행 방식">
            {data.contact}
          </S.InlineContent>
          <S.InlineContent title="협업 경험">
            {data.hasCoWork ? '있음' : '없음'}
          </S.InlineContent>
          <S.InlineContent title="협업 시 중요하게 생각하는 것">
            {data.priority?.map((item) => <S.Text key={item} className="ic-text">{item}</S.Text>)}
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
          <S.Domain>{`${data.field} ${data.devExp}`}</S.Domain>
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

import React, { useEffect, useRef, useState } from 'react';
import { skillsLabel } from 'style/preset';
import DetailModalTemplate, { ContentItem } from '../template';
import { ITeamDetailModal } from '../Team';
import * as S from '../style';

type InputState = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset?: () => void;
}

type SkillState = {
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  removeLabel: (event: React.MouseEvent<HTMLButtonElement>, name: string) => void;
}

type InputsState = { [key: string]: InputState; } & { skill: SkillState & InputState; }

type ContentsState = {
    value: ContentItem[];
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>, title: string) => void;
}

const TeamAddForm = ({ data, onCloseModal }: ITeamDetailModal) => {
  const { people } = data;

  const [name, setName] = useState(data.name);
  const [outline, setOutline] = useState(data.outline);
  const [skill, setSkill] = useState('');
  const [contents, setContents] = useState(data.contents);

  const [skills, setSkills] = useState(data.skills);

  const inputsState: InputsState = {
    name: {
      value: name,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      },
    },
    outline: {
      value: outline,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutline(event.target.value);
      },
    },
    skill: {
      value: skill,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => setSkill(event.target.value),
      onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = inputsState.skill;
        if (value.length < 2 || event.key !== 'Enter') return;

        setSkills((prev) => {
          const isInPrev = prev.some((skillName) => skillName === value);
          if (isInPrev) return prev;
          return [...prev, value];
        });
        inputsState.skill.reset!();
      },
      reset: () => setSkill(''),
      removeLabel: (_, labelName) => {
        setSkills(skills.filter((skillName) => skillName !== labelName));
      },
    },
  };

  const contentsState: ContentsState = {
    value: contents,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>, title: string) => {
      const { target } = event;
      // change height of Textarea automatically by value;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;

      setContents((prev) => prev.map((_content) => {
        const copied: ContentItem = { ..._content };

        if (copied.title === title) copied.text = target.value;
        return copied;
      }));
    },
  };

  const headerContents = (
    <>
      <S.TitleInput
        value={inputsState.name.value}
        placeholder="팀 이름"
        autoWidth
        maxWidth={300}
        onChange={inputsState.name.onChange}
      />
      <S.OutlineInput
        value={inputsState.outline.value}
        placeholder="한 줄 소개"
        autoWidth
        minWidth={4}
        maxWidth={300}
        onChange={inputsState.outline.onChange}
      />
    </>
  );

  const inlineContents = (
    <>
      <S.ContentItem>
        { people
            && <S.InlineContent title="구성원" className="ci-people">
              {people.map((person: string) => (
                <S.Text type="people">{person}</S.Text>
              ))}
            </S.InlineContent>}
      </S.ContentItem>
      <S.ContentItem>
        <S.InlineContent title="기술 스택" className="ci-skills">
          <S.LabelInputBox
            list={skills}
            colors={skillsLabel}
            value={inputsState.skill.value}
            maxWidth={150}
            onChange={inputsState.skill.onChange}
            onKeyPress={inputsState.skill.onKeyPress}
            removeLabel={inputsState.skill.removeLabel}
          />
        </S.InlineContent>
      </S.ContentItem>
    </>
  );

  const blockContents = data.contents.map((content: ContentItem, i: number) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      // initailize height on mounted
      if (ref.current) {
        const { scrollHeight, style } = ref.current! as HTMLTextAreaElement;
        style.height = `${scrollHeight}px`;
      }
    }, []);

    return (
      <S.ContentItem>
        <S.BlockContent title={content.title} className="ci-block">
          <S.Textarea
            inputRef={ref}
            type="textarea"
            value={contentsState.value[i].text}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              contentsState.onChange(event, content.title);
            }}
          />
        </S.BlockContent>
      </S.ContentItem>
    );
  });

  return (
    <DetailModalTemplate
      modalHeader={headerContents}
      modalBody={(
        <>
          <S.ContentsList>{inlineContents}</S.ContentsList>
          <S.ContentsList>{blockContents}</S.ContentsList>
        </>
      )}
      modalButton={
        <S.SubmitButton size="medium" color="yellow" onClick={() => {}}>
          팀 생성하기
        </S.SubmitButton>
      }
      onCloseModal={onCloseModal}
    />
  );
};

export default TeamAddForm;

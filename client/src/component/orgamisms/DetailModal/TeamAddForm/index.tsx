import React, { useEffect, useRef, useState } from 'react';
import { skillsLabel } from 'style/preset';
import { createTeam } from 'graphql/mutations';
import { gql, useMutation } from '@apollo/client';
import { Item } from 'component/orgamisms/AutoCompleteList';
import DetailModalTemplate, { ContentItem } from '../template';
import { TeamModalProps } from '../Team';
import * as S from '../style';

interface InputState {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset?: () => void;
}

interface SkillState {
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onCompletorClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  removeLabel: (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string,
  ) => void;
}

// use type alias for computed value
type InputsState = { [key: string]: InputState } & {
  skill: SkillState & InputState;
};

interface ContentsState {
  value: ContentItem[];
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    title: string,
  ) => void;
}

const isInArray = (arr: string[], target: string) => arr
  .some((item) => item.toLowerCase() === target.toLowerCase());
const findInArray = (arr: string[], value: string) => arr
  .find((item) => item.toLowerCase() === value.toLowerCase());

const contentsTitle = [
  { title: '구현하고자 하는 것', text: '' },
  { title: '진행상황', text: '' },
];

interface Props extends TeamModalProps {
  onAdd: () => void;
}

const TeamAddForm = ({ data, onCloseModal, onAdd }: Props) => {
  const [createTeamData] = useMutation(
    gql`
      ${createTeam}
    `,
  );

  // People data belonged to this team is not edited here
  const people = data?.people || [];

  // Data to submit when create a team
  const [name, setName] = useState(data?.name || '');
  const [outline, setOutline] = useState(data?.outline || '');
  const [skills, setSkills] = useState(data?.skills || []);
  const [contents, setContents] = useState(data?.contents || contentsTitle);

  // Value for skill input
  const [skill, setSkill] = useState('');

  // For Manipulating AutoCompletor
  const completorRef = useRef<HTMLDivElement>();
  const [completor, setCompletor] = useState<Item[]>([]);
  const [focus, setFocus] = useState<number | null>(null);

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
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSkill(value);

        // Search data to be entered into AutoCompletor
        if (value.length > 1) {
          const searched = Object.keys(skillsLabel)
            .reduce((arr: string[], skillName) => {
              const regex = new RegExp(value, 'i');
              if (arr.length < 5 && regex.test(skillName)) {
                arr.push(skillName);
              }
              return arr;
            }, [])
            .map((skillName) => ({ text: skillName, color: skillsLabel[skillName] }));
          setCompletor(searched);
        } else {
          setCompletor([]);
          setFocus(null);
        }
      },
      onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = inputsState.skill;

        if (value.length < 2 || event.key !== 'Enter') return;

        // Add a skill item focused by triggering click event, when press Enter key
        if (typeof focus === 'number') {
          const items = Array.from(completorRef.current?.children as Iterable<HTMLElement>);
          items[focus].click();
          setFocus(null);
          return;
        }

        const target = event.currentTarget;
        setSkills((prev = []) => {
          const updated = [...prev];
          if (isInArray(prev, value)) {
            target.classList.add('alert');
            setTimeout(() => target.classList.remove('alert'), 300);
            return prev;
          }

          // Check if the skill name already exists in preset regardless of case
          const existed = findInArray(Object.keys(skillsLabel), value);
          if (existed) {
            updated.push(existed);
          } else {
            updated.push(value);
          }
          return updated;
        });
        inputsState.skill.reset!();
        setCompletor([]);
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (completor.length < 1) return;

        // Close AutoCompletor on pressing ESC key down
        if (event.key === 'Escape') {
          setCompletor([]);
          setFocus(null);
          return;
        }

        const items = Array.from(completorRef.current?.children as Iterable<HTMLElement>);
        const last = items.length - 1;

        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

        event.preventDefault();

        // Focus on an each item in AutoCompletor sequentially, when press arrow up or down key
        setFocus((prev) => {
          let updated: number;
          if (prev === null) {
            updated = event.key === 'ArrowUp' ? last : 0;
          } else {
            if (event.key === 'ArrowUp') {
              updated = prev > 0 ? prev - 1 : last;
            } else {
              updated = prev < last ? prev + 1 : 0;
            }
            items[prev].classList.remove('focus');
          }

          items[updated].classList.add('focus');
          return updated;
        });
      },
      onCompletorClick: (event: React.MouseEvent<HTMLDivElement>) => {
        const value = event.currentTarget.querySelector('span')!.textContent!;
        const input = completorRef.current?.previousSibling as HTMLInputElement;

        setSkills((prev = []) => {
          if (isInArray(prev, value)) {
            input.classList.add('alert');
            setTimeout(() => input.classList.remove('alert'), 500);
            return prev;
          }
          return [...prev, value];
        });

        inputsState.skill.reset!();
        setCompletor([]);
        input.focus();
      },
      reset: () => setSkill(''),
      removeLabel: (_, labelName) => {
        setSkills(skills.filter((skillName) => skillName !== labelName));
      },
    },
  };

  const contentsState: ContentsState = {
    value: contents,
    onChange: (
      event: React.ChangeEvent<HTMLTextAreaElement>,
      title: string,
    ) => {
      const { target } = event;
      // Change height of Textarea automatically by value;
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
        {people && (
          <S.InlineContent title="구성원" className="ci-people">
            {people.map((person: string) => (
              <S.Text className="people">{person}</S.Text>
            ))}
          </S.InlineContent>
        )}
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
            onKeyDown={inputsState.skill.onKeyDown}
            removeLabel={inputsState.skill.removeLabel}
            completor={{
              ref: completorRef,
              items: completor,
              onItemClick: inputsState.skill.onCompletorClick,
            }}
          />
        </S.InlineContent>
      </S.ContentItem>
    </>
  );

  const blockContents = contentsState.value.map(
    (content: ContentItem, i: number) => {
      const ref = useRef<HTMLTextAreaElement>(null);

      useEffect(() => {
        // initailize height on mounted
        if (ref.current) {
          const { scrollHeight, style } = ref.current! as HTMLTextAreaElement;
          style.height = `${scrollHeight}px`;
        }
      }, []);

      return (
        <S.ContentItem key={content.title}>
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
    },
  );

  const onSubmit = async () => {
    if (name.length < 2) return;
    await createTeamData({
      variables: {
        input: {
          name,
          people,
          skills,
          outline,
          contents,
          state: '모집중',
        },
      },
    });
    onAdd();
  };

  return (
    <DetailModalTemplate
      modalHeader={headerContents}
      modalBody={
        <>
          <S.ContentsList>{inlineContents}</S.ContentsList>
          <S.ContentsList>{blockContents}</S.ContentsList>
        </>
      }
      modalButton={
        <S.SubmitButton size="medium" color="yellow" onClick={onSubmit}>
          팀 생성하기
        </S.SubmitButton>
      }
      onCloseModal={onCloseModal}
    />
  );
};

export default TeamAddForm;

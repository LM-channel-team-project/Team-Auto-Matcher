import React, { useEffect, useRef, useState } from 'react';
import { skillsLabel } from 'style/preset';
import { Item } from 'component/orgamisms/AutoCompleteList';
import { getUser, listTeamDashboard } from 'graphql/queries';
import { createTeam, updateUser, updateTeam } from 'graphql/mutations';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
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
const isInArray = (a: string[], v: string) => a.some((e) => e.toLowerCase() === v.toLowerCase());

const findInArray = (a: string[], v: string) => a.find((e) => e.toLowerCase() === v.toLowerCase());
// Search for skills what included an string entered
const searchOnSkills = (value: string) => {
  const skills = Object.keys(skillsLabel);
  const escapePattern = /[`~!@#$%^&*()\\\-_=+|[\]{};:'",.<>/?]/g;
  const match = new Set(value.match(escapePattern));

  const searched: string[] = [];
  for (let i = 0; i < skills.length; i += 1) {
    if (searched.length >= 5) break;

    const skill = skills[i];
    const escaped = Array.from(match).reduce(
      (str, char) => str.replaceAll(char, `\\${char}`),
      value,
    );

    const regex = new RegExp(escaped, 'i');

    if (regex.test(skill)) {
      searched.push(skill);
    }
  }

  return searched.map((skill) => ({ text: skill, color: skillsLabel[skill] }));
};

const contentsTitle = [
  { title: '구현하고자 하는 것', text: '' },
  { title: '진행상황', text: '' },
];

const TeamAddForm = ({ data, onCloseModal, onClickUpdate }: TeamModalProps) => {
  const history = useHistory();
  const { data: userData, refetch } = useQuery(
    gql`
      ${getUser}
    `,
  );
  const { refetch: teamRefetch } = useQuery(
    gql`
      ${listTeamDashboard}
    `,
  );
  const [createTeamData] = useMutation(
    gql`
      ${createTeam}
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

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => {});

  // Data to submit when create a team
  const [name, setName] = useState(data?.name || '');
  const [outline, setOutline] = useState(data?.outline || '');
  const [skills, setSkills] = useState(data?.skills || []);
  const [contents, setContents] = useState(data?.contents || contentsTitle);
  const [teamState, setTeamState] = useState(data?.state || '');

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

        if (value.length > 0) {
          const searched = searchOnSkills(value);
          setCompletor(searched);
        } else {
          setCompletor([]);
          setFocus(null);
        }
      },
      onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = inputsState.skill;

        if (value.length < 1 || event.key !== 'Enter') return;

        // Add a skill item focused by triggering click event, when press Enter key
        if (typeof focus === 'number') {
          const items = Array.from(
            completorRef.current?.children as Iterable<HTMLElement>,
          );
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

        const items = Array.from(
          completorRef.current?.children as Iterable<HTMLElement>,
        );
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

  const onClickState = () => {
    if (teamState === '모집중') {
      setTeamState('진행중');
    } else if (teamState === '진행중') {
      setTeamState('종료');
    } else {
      setTeamState('모집중');
    }
  };

  const headerContents = (
    <>
      {data && <S.ClickState onClick={onClickState} text={teamState} />}
      <S.TitleInput
        value={inputsState.name.value}
        placeholder="팀 이름"
        autoWidth
        minWidth={4}
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

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onMake = async () => {
    if (name.length < 2) return;
    if (userData) {
      if (!data) {
        const userItems = userData.getUser.items[0];
        if (!userItems.surveyCompleted) {
          openModal();
          setConfirmText(
            '설문을 완료 후 팀을 만들어주세요. 확인을 누르면 설문 페이지로 넘어갑니다.',
          );
          setConfirmFunction(() => () => {
            history.push('/survey');
          });
          return;
        }
        if (userItems.haveTeam) {
          openModal();
          setConfirmText('최대 한 개의 팀만 생성할 수 있습니다.');
          const closeModals = () => {
            onCloseModal();
            closeModal();
          };
          setConfirmFunction(() => closeModals);
          return;
        }
        const dateObj = new Date();
        const today = `${dateObj.getFullYear()} - ${dateObj.getMonth() + 1} - ${dateObj.getDate()}`;
        const removeType = userItems.teamList.map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
        await updateUserData({
          variables: {
            input: {
              id: userItems.id,
              haveTeam: true,
              teamList: [...removeType, { id: userItems.id, name }],
            },
          },
        });
        await refetch();
        await createTeamData({
          variables: {
            input: {
              id: userItems.id,
              name,
              people: [
                { id: userItems.id, name: userItems.question[11].answers[0] },
              ],
              skills,
              outline,
              contents,
              owner: userItems.id,
              state: '모집중',
              createAt: today,
            },
          },
        });
        await teamRefetch();
        onCloseModal();
        history.go(0);
      } else {
        const updateConfirm = async () => {
          const removeType = contents.map((el: any) => ({
            title: el.title,
            text: el.text,
          }));
          await updateTeamData({
            variables: {
              input: {
                id: data?.id,
                name,
                skills,
                outline,
                contents: removeType,
                state: teamState,
              },
            },
          });
          await teamRefetch();
          onCloseModal();
        };
        openModal();
        setConfirmText('확인을 누르면 업데이트가 완료됩니다.');
        setConfirmFunction(() => updateConfirm);
      }
    }
  };

  return (
    <>
      <DetailModalTemplate
        modalHeader={headerContents}
        modalBody={
          <>
            <S.ContentsList>{inlineContents}</S.ContentsList>
            <S.ContentsList>{blockContents}</S.ContentsList>
          </>
        }
        modalButton={
          !data ? (
            <S.SubmitButton size="medium" color="yellow" onClick={onMake}>
              팀 생성하기
            </S.SubmitButton>
          ) : (
            <>
              <S.SubmitButton size="medium" color="yellow" onClick={onMake}>
                업데이트
              </S.SubmitButton>
              <S.SpaceSpan />
              <S.SubmitButton size="medium" color="red" onClick={onClickUpdate}>
                취소
              </S.SubmitButton>
            </>
          )
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

export default TeamAddForm;

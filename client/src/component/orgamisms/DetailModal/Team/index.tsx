import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';

import { DELETE_TEAM, UPDATE_USER, UPDATE_TEAM } from 'graphql/mutations';
import { GET_USER, GET_USER_BY_ID, LIST_TEAM_DASHBOARD } from 'graphql/queries';
import getKoreaTime from 'utils/date';

import ConfirmModal from 'component/orgamisms/ConfirmModal';
import { skillsLabel } from 'style/preset';
import makeObjectShorten from 'utils/makeObjectShorten';
import DetailModalTemplate, { ContentItem, TeamListType, CommentsType } from '../template';
import * as S from '../style';

export interface TeamModalProps {
  data?: {
    id: string;
    name: string;
    people: TeamListType[];
    outline: string;
    contents: ContentItem[];
    skills: string[];
    state: string;
    owner: string;
    createdAt: Date;
    reponame: string;
    comments: CommentsType[];
  };
  onCloseModal: () => void;
  onClickUpdate: () => void;
}

interface CommentState {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset?: () => void;
  removeLabel: (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string,
  ) => void;
}

const TeamDetailModal = ({
  data,
  onCloseModal,
  onClickUpdate,
}: TeamModalProps) => {
  // github API
  const api = axios.create({
    baseURL: `https://api.github.com/repos/LM-channel-team-project/${data?.reponame}`,
    headers: {
      Authorization: process.env.REACT_APP_GIT_APIKEY,
    },
  });

  type GitApiType = {
    [key: string]: any;
  };

  // const [languages, setLanguages] = useState<GitApiType>({});
  const [home, setHome] = useState<GitApiType>({});
  const [contributor, setContributor] = useState([{}]);
  const [getApi, setGetApi] = useState<boolean>(false);
  const gitApi = {
    homes: () => api.get(''),
    languages: () => api.get('/languages'),
    contributors: () => api.get('/contributors'),
  };

  useEffect(() => {
    const gitInfo = async () => {
      try {
        const { data: homeData } = await gitApi.homes();
        // const { data: langData } = await gitApi.languages();
        const { data: contData } = await gitApi.contributors();
        setHome(homeData);
        // setLanguages(langData);
        setContributor(contData);
        setGetApi(true);
      } catch (e) {
        // console.log(e);
        setGetApi(false);
      }
    };
    gitInfo();
  }, []);

  const { data: userData, refetch } = useQuery(GET_USER);
  const { refetch: teamRefetch } = useQuery(LIST_TEAM_DASHBOARD);
  const { refetch: userRefetch } = useQuery(GET_USER_BY_ID);

  const [updateUserData] = useMutation(UPDATE_USER);
  const [updateTeamData] = useMutation(UPDATE_TEAM);
  const [deleteTeamData] = useMutation(DELETE_TEAM);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => { });
  const [isInTeam, setIsInTeam] = useState<boolean>(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(data?.comments || []);

  useEffect(() => {
    data?.people.forEach((el: any) => {
      if (el.id === userData?.getUser.items[0]?.id) {
        setIsInTeam(true);
      }
    });
  }, [userData]);

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

    const people = data?.people.map((person: TeamListType) => (
      <S.Text className="people">{person.name}</S.Text>
    ));
    const GetGitApi = () => (
      <S.GitContainer>
        <h1 className="title">Team GitHub Info</h1>
        <div className="content">{home.description}</div>
        <a className="url" href={home.html_url} target="_blank">
          Github URL
        </a>
        <div className="users">
          {contributor.map((person: any) => (
            <a className="users_info" href={person.html_url} target="_blank">
              <img src={person.avatar_url} />
              <div className="user">{person.login}</div>
            </a>
          ))}
        </div>
      </S.GitContainer>
    );

    let createdAt;
    if (data) {
      createdAt = getKoreaTime(data.createdAt);
    }

    const inlineContents = (
      <>
        <S.ContentItem>{getApi && <GetGitApi />}</S.ContentItem>
        <S.ContentItem>
          <S.InlineContent title="팀 생성일" className="ci-people">
            {createdAt}
          </S.InlineContent>
        </S.ContentItem>
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

    const commentState: CommentState = {
      value: comment,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setComment(value);
      },
      onKeyPress: async (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = commentState;
        if (value.length < 1 || event.key !== 'Enter') return;
        const removeType: CommentsType[] = comments.map((el: any) => ({
          date: el.date,
          owner: el.owner,
          comment: el.comment,
          name: el.name,
        }));
        const newComment = {
          date: new Date(),
          owner: userData?.getUser.items[0]?.id,
          comment: value,
          name: userData?.getUser.items[0]?.question[11].answers[0],
        };
        const teamObject = {
          id: data?.id,
          comments: [...removeType, newComment],
        };
        await updateTeamData(makeObjectShorten(teamObject));
        await teamRefetch();
        setComments([...removeType, newComment]);
        commentState.reset!();
      },
      reset: () => setComment(''),
      removeLabel: async (_, labelName) => {
        const filteredData: CommentsType[] = comments
          .filter((el: any) => `${el.date + el.owner}` !== labelName)
          .map((el: any) => ({
            date: el.date,
            owner: el.owner,
            comment: el.comment,
            name: el.name,
          }));
        const teamObject = {
          id: data?.id,
          comments: filteredData,
        };
        await updateTeamData(makeObjectShorten(teamObject));
        await teamRefetch();
        setComments(filteredData);
      },
    };

    const commentData = () => {
      const commentContents = (
        <>
          <S.ContentItem>
            <S.CommentInputBox
              list={comments}
              value={commentState.value}
              maxWidth={500}
              onKeyPress={commentState.onKeyPress}
              onChange={commentState.onChange}
              removeLabel={commentState.removeLabel}
              teamId={data?.id}
              myId={userData?.getUser.items[0]?.id}
            />
          </S.ContentItem>
        </>
      );

      return (
        <S.BlockContent title={`댓글 ${comments.length}개`} className="ci-block">
          {commentContents}
        </S.BlockContent>
      );
    };

    return (
      <>
        <S.ContentsList>{inlineContents}</S.ContentsList>
        <S.ContentsList>{blockContents}</S.ContentsList>
        <S.CommentsWrapper>{commentData()}</S.CommentsWrapper>
      </>
    );
  };

  const modalButton = () => {
    if (userData?.getUser.items[0]) {
      if (isInTeam && data?.owner !== userData.getUser.items[0].id) {
        return (
          <S.SubmitButton size="medium" color="red" onClick={onClickQuit}>
            탈퇴하기
          </S.SubmitButton>
        );
      }
      if (data?.owner === userData.getUser.items[0].id) {
        return (
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
        );
      }
      if (data?.state !== '종료') {
        return (
          <S.SubmitButton size="medium" color="yellow" onClick={onClickApply}>
            지원하기
          </S.SubmitButton>
        );
      }
    }
    return <></>;
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickQuit = async () => {
    const confirmQuit = async () => {
      const userItems = userData?.getUser.items[0];
      const teamFilter = userItems.teamList
        .filter((el: any) => el.id !== data?.id)
        .map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
      const peopleFilter = data?.people
        .filter((el: any) => el.id !== userItems.id)
        .map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
      const userObject = {
        id: userItems.id,
        teamList: teamFilter,
      };
      const teamObject = {
        id: data?.id,
        people: peopleFilter,
      };
      await updateUserData(makeObjectShorten(userObject));
      await updateTeamData(makeObjectShorten(teamObject));
      await teamRefetch();
      await refetch();
      onCloseModal();
      closeModal();
    };
    openModal();
    setConfirmText('확인을 누르면 팀에서 탈퇴합니다.');
    setConfirmFunction(() => confirmQuit);
  };

  const onClickApply = async () => {
    const confirmApply = async () => {
      const res = await userRefetch({ id: data?.owner });
      let isDuplicated = false;
      const frontData = res.data.getUserById.mail
        .map((el: any) => {
          if (
            el.from === userData?.getUser.items[0].id
            && el.type === 'apply'
          ) {
            isDuplicated = true;
          }
          return ({
            from: el.from,
            teamId: el.teamId,
            type: el.type,
            teamName: el.teamName,
          });
        });
      if (isDuplicated) {
        setConfirmText('이미 동일한 팀에 지원하였습니다.');
        setConfirmFunction(() => closeModal);
        return;
      }
      const changeIntoSet = new Set(frontData);
      const changeIntoArray = Array.from(changeIntoSet);
      const newData = {
        from: userData?.getUser.items[0].id,
        teamId: data?.id,
        type: 'apply',
        teamName: data?.name,
        date: new Date(),
      };
      const combinedData = [...changeIntoArray, newData];
      const userObject = {
        id: data?.owner,
        mail: combinedData,
      };
      await updateUserData(makeObjectShorten(userObject));
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
      const teamObject = {
        id: data?.id,
      };
      await deleteTeamData(makeObjectShorten(teamObject));
      data?.people.forEach(async (person: TeamListType, index: number) => {
        const res = await userRefetch({ id: person.id });
        const teamFilter = res.data.getUserById.teamList
          .filter((el: any) => el.id !== data?.id)
          .map((el: any) => ({
            id: el.id,
            name: el.name,
          }));
        if (index === 0) {
          const userObject = {
            id: data?.owner,
            haveTeam: false,
            teamList: teamFilter,
          };
          await updateUserData(makeObjectShorten(userObject));
        } else {
          const userObject = {
            id: person.id,
            teamList: teamFilter,
          };
          await updateUserData(makeObjectShorten(userObject));
        }
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
        modalButton={modalButton()}
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

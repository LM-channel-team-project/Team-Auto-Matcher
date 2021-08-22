import React, { useEffect, useState } from 'react';
import { skillsLabel } from 'style/preset';
import { getUser, getUserById, listTeamDashboard } from 'graphql/queries';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import { gql, useQuery, useMutation } from '@apollo/client';
import { updateUser, deleteTeam, updateTeam } from 'graphql/mutations';
import axios from 'axios';
import DetailModalTemplate, { ContentItem, teamListType } from '../template';
import * as S from '../style';

export interface TeamModalProps {
  data?: {
    id: string;
    name: string;
    people: teamListType[];
    outline: string;
    contents: ContentItem[];
    skills: string[];
    state: string;
    owner: string;
    reponame: string;
    createdAt: Date;
  };
  onCloseModal: () => void;
  onClickUpdate: () => void;
}

const TeamDetailModal = ({
  data,
  onCloseModal,
  onClickUpdate,
}: TeamModalProps) => {
  // github API
  const api = axios.create({
    baseURL: `https://api.github.com/repos/LM-channel-team-project/${data?.reponame}`,
  });

  type GitApiType = {
    [key: string]: any;
  };

  // const [languages, setLanguages] = useState<GitApiType>({});
  const [home, setHome] = useState<GitApiType>({});
  const [contributor, setContributor] = useState([{}]);
  const [getApi, setGetApi] = useState<boolean>(true);
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
        console.log(e);
        setGetApi(false);
      }
    };
    gitInfo();
  }, []);

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

  const [updateTeamData] = useMutation(
    gql`
      ${updateTeam}
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
  const [isInTeam, setIsInTeam] = useState<boolean>(false);

  useEffect(() => {
    data?.people.forEach((el: any) => {
      if (el.id === userData?.getUser.items[0].id) {
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

    const people = data?.people.map((person: teamListType) => (
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
      const date = new Date(data.createdAt);
      const utc = date.getTime();
      const koreaTimeDiff = 9 * 60 * 60 * 1000;
      createdAt = new Date(utc + koreaTimeDiff).toISOString().substring(0, 10);
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

    return (
      <>
        <S.ContentsList>{inlineContents}</S.ContentsList>
        <S.ContentsList>{blockContents}</S.ContentsList>
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
        .filter((el: any) => {
          if (el.id === data?.id) {
            return false;
          }
          return true;
        })
        .map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
      const peopleFilter = data?.people
        .filter((el: any) => {
          if (el.id === userItems.id) {
            return false;
          }
          return true;
        })
        .map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
      await updateUserData({
        variables: {
          input: {
            id: userItems.id,
            teamList: teamFilter,
          },
        },
      });
      await updateTeamData({
        variables: {
          input: {
            id: data?.id,
            people: peopleFilter,
          },
        },
      });
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
      let isDuplicated = false;
      const frontData = userIdData.getUserById.mail
        .filter((el: any) => {
          if (
            el.from === userData?.getUser.items[0].id
            && el.type === 'apply'
          ) {
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
        from: userData?.getUser.items[0].id,
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

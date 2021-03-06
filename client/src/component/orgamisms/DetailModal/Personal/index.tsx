import React, { useState, useEffect } from 'react';
import { skillsLabel } from 'style/preset';
import {
  getUser,
  getUserById,
  getTeamDashboard,
  listUser,
} from 'graphql/queries';
import { useHistory } from 'react-router-dom';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import { gql, useQuery, useMutation } from '@apollo/client';
import { updateUser, updateTeam } from 'graphql/mutations';
import DetailModalTemplate, {
  QuestionItem,
  MailType,
  teamListType,
} from '../template';
import * as S from '../style';

export interface PersonalModalProps {
  data: {
    id: string;
    haveTeam: boolean;
    surveyCompleted: boolean;
    question: QuestionItem[];
    personState: string;
    teamList: teamListType[];
    mail: MailType[];
  };
  onCloseModal: () => void;
}

const PersonalDetailModal = ({ data, onCloseModal }: PersonalModalProps) => {
  const history = useHistory();
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
      variables: { id: data?.id },
    },
  );

  const { data: teamData, refetch: teamRefetch } = useQuery(
    gql`
      ${getTeamDashboard}
    `,
    {
      variables: { id: userData && userData.getUser.items[0]?.id },
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

  const { refetch: listUserRefetch } = useQuery(
    gql`
      ${listUser}
    `,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => {});
  const [personState, setPersonState] = useState<string>(
    data?.personState || '',
  );
  const [isInTeam, setIsInTeam] = useState<boolean>(false);

  useEffect(() => {
    data?.teamList.forEach((el: any) => {
      if (el.id === userData?.getUser.items[0]?.id) {
        setIsInTeam(true);
      }
    });
  }, [userData]);

  const renderContents = () => {
    const skills = data.question[1].answers?.map((skill: string) => {
      const skillName = Object.keys(skillsLabel).find(
        (name) => name.toLowerCase() === skill.toLowerCase(),
      );
      return (
        <S.TextLabel
          key={skill}
          className="dc-label"
          text={skill}
          color={skillsLabel[String(skillName)]}
        />
      );
    });

    const team = data?.teamList.length > 0 ? (
      data.teamList.map((aTeam: teamListType) => (
        <S.Text className="team" key={aTeam.id}>
          {aTeam.name}
        </S.Text>
      ))
    ) : (
      <S.Text>??? ????????? ???</S.Text>
    );

    const inlineContents = (
      <>
        <S.ContentItem>
          <S.InlineContent title="????????? ???" className="ci-people">
            {team}
          </S.InlineContent>
        </S.ContentItem>
        <S.ContentItem>
          <S.InlineContent title="?????? ??????" className="ci-skill">
            {skills}
          </S.InlineContent>
          <S.InlineContent title="?????? ??????">
            {data.question[2].answers[0]}
          </S.InlineContent>
          <S.InlineContent title="?????? ?????? ??????">
            {data.question[3].answers[0]}
          </S.InlineContent>
          {
            <S.InlineContent title="?????? ?????? ?????????">
              {data.question[4].answers?.map((time: any) => (
                <S.Text key={time} className="ic-text">
                  {time}
                </S.Text>
              ))}
            </S.InlineContent>
          }
          <S.InlineContent title="?????? ??????">
            {data.question[5].answers[0]}
          </S.InlineContent>
          <S.InlineContent title="?????? ??????">
            {data.question[6].answers[0] ? '??????' : '??????'}
          </S.InlineContent>
          <S.InlineContent title="?????? ??? ???????????? ???????????? ???">
            {data.question[7].answers?.map((item: any) => (
              <S.Text key={item} className="ic-text">
                {item}
              </S.Text>
            ))}
          </S.InlineContent>
          <S.BlockContent title="???????????? ?????? ????????????" className="ci-block">
            <S.Paragraph>{data.question[9].answers}</S.Paragraph>
          </S.BlockContent>
        </S.ContentItem>
      </>
    );

    const blockContents = (
      <>
        <S.ContentItem key={data.question[8].title}>
          <S.BlockContent title={data.question[8].title} className="ci-block">
            <S.Paragraph>{data.question[8].answers}</S.Paragraph>
          </S.BlockContent>
        </S.ContentItem>
      </>
    );

    return (
      <>
        <S.ContentsList>{inlineContents}</S.ContentsList>
        <S.ContentsList>{blockContents}</S.ContentsList>
      </>
    );
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickInvite = async () => {
    if (userData && userIdData && teamData) {
      const confirmInvite = async () => {
        const userItems = userData.getUser.items[0];
        const teamItems = teamData.getTeamDashboard;
        if (!userItems.haveTeam) {
          setConfirmText(
            '????????? ???????????? ?????? ?????? ????????????. ????????? ????????? ??? ????????? ?????? ???????????? ???????????????.',
          );
          setConfirmFunction(() => () => {
            history.push('/dashboard/team');
          });
          return;
        }
        let isDuplicate = false;
        const frontData = userIdData.getUserById.mail
          .filter((el: any) => {
            if (
              el.from === userData?.getUser.items[0].id
              && el.type === 'invite'
            ) {
              isDuplicate = true;
            }
            return true;
          })
          .map((el: any) => ({
            from: el.from,
            teamId: el.teamId,
            type: el.type,
            teamName: el.teamName,
          }));
        if (isDuplicate) {
          setConfirmText('?????? ????????? ??????????????????.');
          setConfirmFunction(() => closeModal);
          return;
        }
        const changeIntoSet = new Set(frontData);
        const changeIntoArray = Array.from(changeIntoSet);
        const newData = {
          from: userItems.id,
          teamId: teamItems.id,
          type: 'invite',
          teamName: teamItems.name,
          date: new Date(),
        };
        const combinedData = [...changeIntoArray, newData];
        await updateUserData({
          variables: {
            input: {
              id: data?.id,
              mail: combinedData,
            },
          },
        });
        await refetch();
        onCloseModal();
        closeModal();
      };
      openModal();
      setConfirmText('????????? ????????? ????????? ???????????????.');
      setConfirmFunction(() => confirmInvite);
    }
  };

  const onClickDelete = () => {
    if (userData) {
      const deleteConfirm = async () => {
        await updateUserData({
          variables: {
            input: {
              id: userData.getUser.items[0].id,
              surveyCompleted: false,
              personState: '??? ????????? ???',
            },
          },
        });
        await refetch();
        await listUserRefetch();
        onCloseModal();
        closeModal();
      };
      openModal();
      setConfirmText(
        '????????? ????????? ????????? ???????????????. ?????? ?????? ???, ?????? ??????????????? ????????? ?????? ??????????????????.',
      );
      setConfirmFunction(() => deleteConfirm);
    }
  };

  const onClickState = () => {
    if (personState === '??? ????????? ???') {
      setPersonState('??????');
    } else if (personState === '??????') {
      setPersonState('??????');
    } else {
      setPersonState('??? ????????? ???');
    }
  };
  useEffect(() => {
    if (data?.id === userData?.getUser.items[0]?.id) {
      const updatePersonState = async () => {
        await updateUserData({
          variables: {
            input: {
              id: userData?.getUser.items[0].id,
              personState,
            },
          },
        });
        await refetch();
      };
      updatePersonState();
    }
  }, [personState]);

  const onClickOut = () => {
    const confirmOut = async () => {
      const userItems = userData?.getUser.items[0];
      const teamFilter = data?.teamList
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
      const peopleFilter = teamData.getTeamDashboard.people
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
      await updateUserData({
        variables: {
          input: {
            id: data?.id,
            teamList: teamFilter,
          },
        },
      });
      await updateTeamData({
        variables: {
          input: {
            id: userItems.id,
            people: peopleFilter,
          },
        },
      });
      await listUserRefetch();
      await teamRefetch();
      onCloseModal();
      closeModal();
    };
    openModal();
    setConfirmText('????????? ????????? ?????? ????????? ????????? ???????????????.');
    setConfirmFunction(() => confirmOut);
  };

  const modalButton = () => {
    if (isInTeam && data?.id !== userData?.getUser.items[0].id) {
      return (
        <S.SubmitButton size="medium" color="red" onClick={onClickOut}>
          ??? ????????????
        </S.SubmitButton>
      );
    }
    if (data?.id !== userData?.getUser.items[0]?.id && userData?.getUser) {
      if (data?.personState !== '??????') {
        return (
          <S.SubmitButton size="medium" color="yellow" onClick={onClickInvite}>
            ????????????
          </S.SubmitButton>
        );
      }
      return <></>;
    }
    if (data?.id === userData?.getUser.items[0]?.id) {
      return (
        <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
          ????????????
        </S.SubmitButton>
      );
    }
    return <></>;
  };

  return data ? (
    <>
      <DetailModalTemplate
        modalHeader={
          <>
            {userData
              && (data?.id === userData.getUser.items[0]?.id ? (
                <S.ClickPersonState onClick={onClickState} text={personState} />
              ) : (
                <S.PersonState text={personState} />
              ))}
            <S.Domain>{data.question[0].answers[0]}</S.Domain>
            <S.Title type="personal">{data.question[11].answers[0]}</S.Title>
            <S.Desc>{data.question[10].answers[0]}</S.Desc>
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
  ) : (
    <div>error</div>
  );
};

export default PersonalDetailModal;

import React, { useState } from 'react';
import { skillsLabel } from 'style/preset';
import { getTeamDashboard, getUser, getUserById } from 'graphql/queries';
import { updateUser, updateTeam } from 'graphql/mutations';
import { gql, useQuery, useMutation } from '@apollo/client';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import DetailModalTemplate, { teamListType } from '../template';
import * as S from '../style';

export interface MailModalProps {
  className?: string;
  data: {
    from: string;
    teamName: string;
    teamId: string;
    type: string;
    date: Date;
  };
  onCloseModal: () => void;
}

const MailDetailModal = ({ className, data, onCloseModal }: MailModalProps) => {
  const { data: userData, refetch } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const { data: teamData } = useQuery(
    gql`
      ${getTeamDashboard}
    `,
    {
      variables: { id: data?.teamId },
    },
  );
  const { data: userDataById } = useQuery(
    gql`
      ${getUserById}
    `,
    {
      variables: { id: data?.from },
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
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => {});
  const modalHeader = () => {
    if (userDataById && teamData) {
      const thatUserItems = userDataById.getUserById;
      const teamItems = teamData.getTeamDashboard;
      if (data?.type === 'invite') {
        return (
          <>
            <S.State text={teamItems.state || ''} />
            <S.Title type="team">{teamItems.name}</S.Title>
            <S.Desc>{teamItems.outline}</S.Desc>
          </>
        );
      }
      if (data?.type === 'apply') {
        return (
          <>
            <S.Domain>{thatUserItems.question[0].answers[0]}</S.Domain>
            <S.Title type="personal">
              {thatUserItems.question[11].answers[0]}
            </S.Title>
            <S.Desc>{thatUserItems.question[10].answers[0]}</S.Desc>
          </>
        );
      }
      const Msg = (message: string) => (
        <S.Title type="personal">{`${
          thatUserItems.question[11].answers[0] == null
          || teamItems?.name == null
            ? '?????? ?????????'
            : message
        }`}</S.Title>
      );
      if (data?.type === 'refuse') {
        return Msg('?????? ?????????');
      }
      if (data?.type === 'accept') {
        return Msg('?????? ?????????');
      }
    }
    return <S.Title type="personal">?????????</S.Title>;
  };

  const renderContents = () => {
    if (userDataById && teamData) {
      const teamItems = teamData.getTeamDashboard;
      const thatUserItems = userDataById.getUserById;
      if (data?.type === 'invite') {
        const skills = teamItems.skills.map((skill: string) => {
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
        const people = teamItems.people.map((person: teamListType) => (
          <S.Text className="people">{person.name}</S.Text>
        ));
        const inlineContents = (
          <>
            <S.ContentItem>
              <S.InlineContent title="?????????" className="ci-people">
                {people}
              </S.InlineContent>
            </S.ContentItem>
            <S.ContentItem>
              <S.InlineContent title="?????? ??????" className="ci-skill">
                {skills}
              </S.InlineContent>
            </S.ContentItem>
          </>
        );
        const blockContents = teamItems.contents.map((content: any) => (
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
      }
      if (data?.type === 'apply') {
        const skills = thatUserItems.question[1].answers?.map(
          (skill: string) => {
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
          },
        );
        const team = thatUserItems?.teamList.length > 0 ? (
          thatUserItems.teamList.map((aTeam: teamListType) => (
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
                {thatUserItems.question[2].answers[0]}
              </S.InlineContent>
              <S.InlineContent title="?????? ?????? ??????">
                {thatUserItems.question[3].answers[0]}
              </S.InlineContent>
              {
                <S.InlineContent title="?????? ?????? ?????????">
                  {thatUserItems.question[4].answers?.map((time: any) => (
                    <S.Text key={time} className="ic-text">
                      {time}
                    </S.Text>
                  ))}
                </S.InlineContent>
              }
              <S.InlineContent title="?????? ??????">
                {thatUserItems.question[5].answers[0]}
              </S.InlineContent>
              <S.InlineContent title="?????? ??????">
                {thatUserItems.question[6].answers[0] ? '??????' : '??????'}
              </S.InlineContent>
              <S.InlineContent title="?????? ??? ???????????? ???????????? ???">
                {thatUserItems.question[7].answers?.map((item: any) => (
                  <S.Text key={item} className="ic-text">
                    {item}
                  </S.Text>
                ))}
              </S.InlineContent>
              <S.BlockContent
                title="???????????? ?????? ????????????"
                className="ci-block"
              >
                <S.Paragraph>{thatUserItems.question[9].answers}</S.Paragraph>
              </S.BlockContent>
            </S.ContentItem>
          </>
        );
        const blockContents = (
          <>
            <S.ContentItem key={thatUserItems.question[8].title}>
              <S.BlockContent
                title={thatUserItems.question[8].title}
                className="ci-block"
              >
                <S.Paragraph>{thatUserItems.question[8].answers}</S.Paragraph>
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
      }
      if (data?.type === 'refuse') {
        if (
          thatUserItems.question[11].answers[0] == null
          || teamItems?.name == null
        ) {
          return (
            <>
              <S.ContentsList>
                ???????????? ?????? ?????? ???????????????. <br />
                ???????????? ????????? ?????????.
              </S.ContentsList>
            </>
          );
        }
        return (
          <>
            <S.ContentsList>
              {thatUserItems.question[11].answers[0]}?????????
              <br />
              {teamItems.name}?????? ?????? / ????????? ?????????????????????.
            </S.ContentsList>
          </>
        );
      }
      if (data?.type === 'accept') {
        if (
          thatUserItems.question[11].answers[0] == null
          || teamItems?.name == null
        ) {
          return (
            <>
              <S.ContentsList>
                ???????????? ?????? ?????? ???????????????. <br />
                ???????????? ????????? ?????????.
              </S.ContentsList>
            </>
          );
        }
        return (
          <>
            <S.ContentsList>
              {thatUserItems.question[11].answers[0]} ????????? <br />
              {teamItems.name}?????? ?????? / ????????? ?????????????????????.
              <br />
              github ????????? {thatUserItems.question[11].answers[0]} ??????
              <br />
              Team Auto Matcher github ?????? slack?????? ?????? ??????????????????.
            </S.ContentsList>
          </>
        );
      }
    }
    return (
      <S.LoadingContent>
        <S.LoadingComponent />
        <S.ContentsList>
          ????????? ????????? ??????, ???????????? ??????????????????.
        </S.ContentsList>
      </S.LoadingContent>
    );
  };

  const beTeamMember = async () => {
    if (teamData && userDataById && userData && userData) {
      const teamItems = teamData.getTeamDashboard;
      const thatUserItems = userDataById.getUserById;
      const userItems = userData.getUser.items[0];
      const removeTypeFromPeople = teamItems.people.map((el: any) => ({
        id: el.id,
        name: el.name,
      }));
      await updateTeamData({
        variables: {
          input: {
            id: data?.teamId,
            people:
              data?.type === 'invite'
                ? [
                  ...removeTypeFromPeople,
                  {
                    id: userItems.id,
                    name: userItems.question[11].answers[0],
                  },
                ]
                : [
                  ...removeTypeFromPeople,
                  {
                    id: thatUserItems.id,
                    name: thatUserItems.question[11].answers[0],
                  },
                ],
          },
        },
      });
      const removeType = data?.type === 'invite'
        ? userItems.teamList.map((el: any) => ({
          id: el.id,
          name: el.name,
        }))
        : thatUserItems.teamList.map((el: any) => ({
          id: el.id,
          name: el.name,
        }));
      await updateUserData({
        variables: {
          input: {
            id: data?.type === 'invite' ? userItems.id : data?.from,
            teamList: [
              ...removeType,
              { id: teamItems.id, name: data?.teamName },
            ],
          },
        },
      });
    }
  };

  const sendMessage = async (type: string) => {
    if (userDataById && userData) {
      const userItems = userData.getUser.items[0];
      const frontData = userDataById.getUserById.mail?.map((el: any) => ({
        from: el.from,
        teamId: el.teamId,
        type: el.type,
        teamName: el.teamName,
        date: el.date,
      }));
      const newMail = {
        from: userItems.id,
        teamId: data?.teamId,
        type,
        teamName: data?.teamName,
        date: new Date(),
      };
      const combinedData = [...frontData, newMail];

      await updateUserData({
        variables: {
          input: {
            id: data?.from,
            mail: combinedData,
          },
        },
      });
    }
  };

  const delMessage = async () => {
    if (userData) {
      const userItems = userData.getUser.items[0];
      const filteredMail = userItems.mail
        .filter((el: any) => {
          if (
            el.from === data?.from
            && el.type === data?.type
            && el.teamId === data?.teamId
            && el.teamName === data?.teamName
          ) {
            return false;
          }
          return true;
        })
        .map((el: any) => ({
          from: el.from,
          teamId: el.teamId,
          type: el.type,
          teamName: el.teamName,
          date: el.date,
        }));
      await updateUserData({
        variables: {
          input: {
            id: userItems.id,
            mail: filteredMail,
          },
        },
      });
      await refetch();
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const closeModals = () => {
    closeModal();
    onCloseModal();
  };

  const onClickAccept = async () => {
    openModal();
    if (data?.type === 'invite') {
      setConfirmText(
        '????????? ????????? ????????? ????????? ???????????????. ??????????????? slack?????? ?????????, ????????? ????????? ??????????????????.',
      );
    } else {
      setConfirmText(
        '????????? ????????? ???????????? ????????? ????????? ???????????????. ??????????????? slack?????? ?????????, ????????? ??????????????????.',
      );
    }
    const confirmAccept = async () => {
      await beTeamMember();
      await sendMessage('accept');
      await delMessage();
      closeModals();
    };
    setConfirmFunction(() => confirmAccept);
  };

  const onClickRefuse = async () => {
    openModal();
    setConfirmText('????????? ????????? ????????? ???????????? ???????????? ???????????????.');
    const confirmRefuse = async () => {
      await sendMessage('refuse');
      await delMessage();
      closeModals();
    };
    setConfirmFunction(() => confirmRefuse);
  };

  const onClickDelete = async () => {
    openModal();
    setConfirmText('????????? ????????? ???????????? ???????????????.');
    const confirmDelete = async () => {
      await delMessage();
      closeModals();
    };
    setConfirmFunction(() => confirmDelete);
  };

  const modalButton = () => {
    if (userDataById && teamData) {
      if (
        data?.type === 'accept'
        || data?.type === 'refuse'
      ) {
        return (
          <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
            ????????? ??????
          </S.SubmitButton>
        );
      }
      return (
        <>
          <S.SubmitButton size="medium" color="yellow" onClick={onClickAccept}>
            ????????????
          </S.SubmitButton>
          <span style={{ marginRight: '2rem' }}></span>
          <S.SubmitButton size="medium" color="gray" onClick={onClickRefuse}>
            ????????????
          </S.SubmitButton>
        </>
      );
    }
    return (
      <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
        ????????? ??????
      </S.SubmitButton>
    );
  };

  return data ? (
    <>
      <DetailModalTemplate
        modalHeader={modalHeader()}
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

export default MailDetailModal;

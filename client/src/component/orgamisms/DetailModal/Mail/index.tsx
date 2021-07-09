import React from 'react';
import { skillsLabel } from 'style/preset';
import {
  getPersonDashboard,
  getTeamDashboard,
  getUser,
  getUserById,
} from 'graphql/queries';
import { updateUser, updateTeam } from 'graphql/mutations';
import { gql, useQuery, useMutation } from '@apollo/client';
import DetailModalTemplate, { ContentItem } from '../template';
import * as S from '../style';

export interface MailModalProps {
  data: {
    from: string;
    teamName: string;
    teamId: string;
    type: string;
  };
  onCloseModal: () => void;
}

const MailDetailModal = ({ data, onCloseModal }: MailModalProps) => {
  const { data: userData, refetch } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const { data: personData } = useQuery(
    gql`
      ${getPersonDashboard}
    `,
    {
      variables: { id: data?.from },
    },
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
  const modalHeader = () => {
    let modeling = <div></div>;
    if (personData && teamData) {
      const personItems = personData.getPersonDashboard;
      const teamItems = teamData.getTeamDashboard;
      if (data?.type === 'invite') {
        modeling = (
          <>
            <S.State text={teamItems.state || ''} />
            <S.Title type="team">{teamItems.name}</S.Title>
            <S.Desc>{teamItems.outline}</S.Desc>
          </>
        );
      } else if (data?.type === 'apply') {
        modeling = (
          <>
            <S.Domain>{personItems.field}</S.Domain>
            <S.Title type="personal">{personItems.name}</S.Title>
            <S.Desc>{personItems.outline}</S.Desc>
          </>
        );
      } else if (data?.type === 'refuse') {
        modeling = <S.Title type="personal">거절 메시지</S.Title>;
      } else if (data?.type === 'accept') {
        modeling = <S.Title type="personal">승인 메시지</S.Title>;
      }
    } else {
      modeling = <S.Title type="personal">로딩중</S.Title>;
    }
    return modeling;
  };

  const renderContents = () => {
    let modeling = <div></div>;
    if (personData && teamData) {
      const teamItems = teamData.getTeamDashboard;
      const personItems = personData.getPersonDashboard;
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
        const people = teamItems.people.map((person: string) => (
          <S.Text className="people">{person}</S.Text>
        ));
        const inlineContents = (
          <>
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
        const blockContents = teamItems.contents.map((content: any) => (
          <S.ContentItem>
            <S.BlockContent title={content.title} className="ci-block">
              <S.Paragraph>{content.text}</S.Paragraph>
            </S.BlockContent>
          </S.ContentItem>
        ));
        modeling = (
          <>
            <S.ContentsList>{inlineContents}</S.ContentsList>
            <S.ContentsList>{blockContents}</S.ContentsList>
          </>
        );
      } else if (data?.type === 'apply') {
        const skills = personItems.skills.map((skill: string) => {
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
        const team = personItems.team.map((aTeam: string) => (
          <S.Text key={aTeam}>{aTeam}</S.Text>
        ));
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
                {personItems.devExp}
              </S.InlineContent>
              <S.InlineContent title="활동 가능 기간">
                {personItems.periods}
              </S.InlineContent>
              {
                <S.InlineContent title="협업 가능 시간대">
                  {personItems.times?.map((time: any) => (
                    <S.Text key={time} className="ic-text">
                      {time}
                    </S.Text>
                  ))}
                </S.InlineContent>
              }
              <S.InlineContent title="진행 방식">
                {personItems.contact}
              </S.InlineContent>
              <S.InlineContent title="협업 경험">
                {personItems.hasCoWork ? '있음' : '없음'}
              </S.InlineContent>
              <S.InlineContent title="협업 시 중요하게 생각하는 것">
                {personItems.priority?.map((item: any) => (
                  <S.Text key={item} className="ic-text">
                    {item}
                  </S.Text>
                ))}
              </S.InlineContent>
            </S.ContentItem>
          </>
        );
        const blockContents = personItems.contents.map((content: any) => (
          <S.ContentItem key={content.title}>
            <S.BlockContent title={content.title} className="ci-block">
              <S.Paragraph>{content.text}</S.Paragraph>
            </S.BlockContent>
          </S.ContentItem>
        ));
        modeling = (
          <>
            <S.ContentsList>{inlineContents}</S.ContentsList>
            <S.ContentsList>{blockContents}</S.ContentsList>
          </>
        );
      } else if (data?.type === 'refuse') {
        modeling = (
          <>
            <S.ContentsList>{personItems.name}님께서</S.ContentsList>
            <S.ContentsList>
              {teamItems.name}팀의 지원 / 초대를 거절하였습니다.
            </S.ContentsList>
          </>
        );
      } else if (data?.type === 'accept') {
        modeling = (
          <>
            <S.ContentsList>{personItems.name}님께서</S.ContentsList>
            <S.ContentsList>
              {teamItems.name}팀의 지원 / 초대를 승인하였습니다.
            </S.ContentsList>
            <S.ContentsList>github 이름 {personItems.name} 님을</S.ContentsList>
            <S.ContentsList>
              Team Auto Matcher github 혹은 slack에서 찾아 소통해주세요.
            </S.ContentsList>
          </>
        );
      }
    } else {
      modeling = (
        <>
          <S.ContentsList>
            로딩이 지속될 경우, 해당 정보를 찾을 수 없는 것이니
          </S.ContentsList>
          <S.ContentsList>메시지를 삭제해주세요.</S.ContentsList>
        </>
      );
    }
    return modeling;
  };

  const beTeamMember = () => {
    const teamItems = teamData.getTeamDashboard;
    const personItems = personData.getPersonDashboard;
    updateTeamData({
      variables: {
        input: {
          id: data?.teamId,
          people: [...teamItems.people, personItems.name],
        },
      },
    });
  };

  const sendMessage = (setType: string) => {
    const userItems = userData.getUser.items[0];
    if (userDataById) {
      const frontData = userDataById.getUserById.mail.map((el: any) => ({
        from: el.from,
        teamId: el.teamId,
        type: el.type,
        teamName: el.teamName,
      }));
      const newMail = {
        from: userItems.id,
        teamId: data?.teamId,
        type: setType,
        teamName: data?.teamName,
      };
      const combinedData = [...frontData, newMail];
      updateUserData({
        variables: {
          input: {
            id: data?.from,
            mail: combinedData,
          },
        },
      });
    }
  };

  const delMessage = () => {
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
      }));
    updateUserData({
      variables: {
        input: {
          id: userItems.id,
          mail: filteredMail,
        },
      },
    });
    refetch();
  };

  const onClickAccept = (): void => {
    beTeamMember();
    sendMessage('accept');
    delMessage();
    alert(
      '팀으로 등록이 완료되었습니다. 팀오토매쳐 slack으로 입장해, 팀장의 연락을 기다려주세요.',
    );
  };

  const onClickRefuse = (): void => {
    sendMessage('refuse');
    delMessage();
    alert('거절이 완료되었습니다.');
  };

  const onClickDelete = (): void => {
    delMessage();
    alert('삭제가 완료되었습니다.');
  };

  const modalButton = () => {
    let modeling = <div></div>;
    if (personData && teamData) {
      if (data?.type === 'accept' || data?.type === 'refuse') {
        modeling = (
          <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
            메시지 삭제
          </S.SubmitButton>
        );
      } else {
        modeling = (
          <>
            <S.SubmitButton
              size="medium"
              color="yellow"
              onClick={onClickAccept}
            >
              수락하기
            </S.SubmitButton>
            <span style={{ marginRight: '2rem' }}></span>
            <S.SubmitButton size="medium" color="gray" onClick={onClickRefuse}>
              거절하기
            </S.SubmitButton>
          </>
        );
      }
    } else {
      modeling = (
        <S.SubmitButton size="medium" color="red" onClick={onClickDelete}>
          메시지 삭제
        </S.SubmitButton>
      );
    }
    return modeling;
  };

  return data ? (
    <DetailModalTemplate
      modalHeader={modalHeader()}
      modalBody={renderContents()}
      modalButton={modalButton()}
      onCloseModal={onCloseModal}
    />
  ) : (
    <div>error</div>
  );
};

export default MailDetailModal;

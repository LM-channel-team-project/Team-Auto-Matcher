import React from 'react';
import { getUser } from 'graphql/queries';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { gql, useQuery } from '@apollo/client';
import { Auth } from 'aws-amplify';
import BaseTemplate from 'page/BaseTemplate';
import * as S from './style';

const googleLoginOnClick = () => Auth.federatedSignIn({
  provider: CognitoHostedUIIdentityProvider.Google,
});

const Home = ({ className, isLoggedIn }: any) => {
  const { data } = useQuery(
    gql`
      ${getUser}
    `,
  );
  // 7월 13일 초대 주소 get, 30일 마다 갱신
  const slackInvite = 'https://join.slack.com/t/w1616672168-iqi184162/shared_invite/zt-sqrkwn93-SsuQ0qY1xwind4cZ1xfUWw';

  const SettingPhase = () => {
    let phase = <S.LoadingComponent />;
    if (isLoggedIn) {
      if (data) {
        if (data.getUser.items?.length !== 0) {
          const userItems = data.getUser.items[0];
          if (userItems.haveTeam) {
            phase = (
              <>
                <S.Left background="https://user-images.githubusercontent.com/71132893/125388384-5eee8e00-e3da-11eb-9b2d-4a5b35cf4fc2.jpg" />
                <S.Right>
                  <S.Title>팀 생성이 완료되었습니다.</S.Title>
                  <S.Description>
                    당신은 팀장으로서 활동을 할 수 있습니다. Team Auto Matcher
                    Github에 접속해서 Repository를 만들고, 팀원을 초대해
                    활동해주세요. Slack에서 팀원들과 소통할 수 있습니다.
                  </S.Description>
                  <a href="https://github.com/LM-channel-team-project">
                    <S.BlackButton>Github</S.BlackButton>
                  </a>
                  <a href={slackInvite}>
                    <S.WhiteButton onClick={() => {}}>Slack</S.WhiteButton>
                  </a>
                </S.Right>
              </>
            );
          } else if (userItems.surveyCompleted) {
            phase = (
              <>
                <S.Left background="https://user-images.githubusercontent.com/71132893/125273607-11294580-e348-11eb-943e-15497e18631b.jpg" />
                <S.Right>
                  <S.Title>설문이 완료되었습니다.</S.Title>
                  <S.Description>
                    Team 페이지로 이동해, 등록할 팀을 찾아보거나 팀을 생성하여
                    팀장으로 활동하세요. 저희 Slack에 접속하시면 당신의 팀과
                    소통하며, 더 많은 정보를 얻으실 수 있습니다.
                  </S.Description>
                  <S.BlackButton
                    onClick={() => {
                      window.location.href = '/dashboard/team';
                    }}
                  >
                    Teams
                  </S.BlackButton>
                  <a href={slackInvite}>
                    <S.WhiteButton>Slack</S.WhiteButton>
                  </a>
                </S.Right>
              </>
            );
          } else {
            phase = (
              <>
                <S.Left background="https://user-images.githubusercontent.com/71132893/125273613-125a7280-e348-11eb-9b49-1a60858adeb9.jpg" />
                <S.Right>
                  <S.Title>로그인이 완료되었습니다.</S.Title>
                  <S.Description>
                    Survey 페이지로 이동해, 몇 개의 질문들에 답을 달고 팀원으로
                    활동해보세요.
                  </S.Description>
                  <S.BlackButton
                    onClick={() => {
                      window.location.href = '/survey';
                    }}
                  >
                    Survey
                  </S.BlackButton>
                  <S.WhiteButton
                    onClick={() => {
                      window.location.href = '/personal';
                    }}
                  >
                    Personal
                  </S.WhiteButton>
                </S.Right>
              </>
            );
          }
        } else {
          phase = (
            <>
              <S.Left background="https://user-images.githubusercontent.com/71132893/125273613-125a7280-e348-11eb-9b49-1a60858adeb9.jpg" />
              <S.Right>
                <S.Title>로그인이 완료되었습니다.</S.Title>
                <S.Description>
                  Survey 페이지로 이동해, 몇 개의 질문들에 답을 달고 팀원으로
                  활동해보세요.
                </S.Description>
                <S.BlackButton
                  onClick={() => {
                    window.location.href = '/survey';
                  }}
                >
                  Survey
                </S.BlackButton>
                <S.WhiteButton
                  onClick={() => {
                    window.location.href = '/personal';
                  }}
                >
                  Personal
                </S.WhiteButton>
              </S.Right>
            </>
          );
        }
      }
    } else {
      phase = (
        <>
          <S.Left background="https://user-images.githubusercontent.com/71132893/125273615-138b9f80-e348-11eb-97f3-6645f25ea40d.jpg" />
          <S.Right>
            <S.Title>프로젝트를 진행할 팀원을 더 자유롭게 모집하세요.</S.Title>
            <S.Description>
              로그인하여 당신의 프로필을 등록하거나, 현재 등록되어 있는 팀들을
              살펴보세요.
            </S.Description>
            <S.BlackButton onClick={googleLoginOnClick}>Login</S.BlackButton>
            <S.WhiteButton
              onClick={() => {
                window.location.href = '/dashboard/team';
              }}
            >
              Teams
            </S.WhiteButton>
          </S.Right>
        </>
      );
    }

    return phase;
  };

  return (
    <BaseTemplate>
      <S.Home>
        <SettingPhase />
      </S.Home>
    </BaseTemplate>
  );
};

export default Home;

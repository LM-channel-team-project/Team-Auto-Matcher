import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { CREATE_USER } from 'graphql/mutations';
import { GET_USER, LIST_QUESTIONNAIRES } from 'graphql/queries';
import makeObjectShorten from 'utils/makeObjectShorten';

import Questionnaire from 'component/orgamisms/Questionnaire';
import ResultComponent from 'component/orgamisms/Result';
import BaseTemplate from 'page/BaseTemplate';
import LoadingPage from 'page/Loading';
import { Answers } from 'types';
import * as S from './style';

const firstInput: Answers[] = Array(12).fill({ title: '', answers: [] });
const Survey = ({ className, isLoggedIn }: any) => {
  const { loading, error, data } = useQuery(LIST_QUESTIONNAIRES);
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(GET_USER);
  const [addUserData] = useMutation(CREATE_USER);

  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login');
    }
  }, [isLoggedIn]);

  const bUserUpdating = useRef<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [answerRespond, setanswerRespond] = useState<Answers[]>(
    userData?.getUser.items[0]
      ? userData.getUser.items[0].question
      : firstInput,
  );
  const [resultOpen, setResultOpen] = useState<boolean>(false);

  if (userError) {
    console.error('userError', userError);
  }
  if (error) {
    console.error('error : ', error);
  }

  if (userLoading || loading || bUserUpdating.current || !userData?.getUser) {
    return <LoadingPage />;
  }

  if (!userLoading && !userError) {
    if (userData) {
      if (userData.getUser && userData.getUser.items?.length !== 0) {
        // console.log('userData : ', userData);
      } else if (bUserUpdating.current === false) {
        bUserUpdating.current = true;
        const userObject = {
          question: firstInput,
          mail: [],
          haveTeam: false,
          surveyCompleted: false,
          personState: '팀 구하는 중',
          teamList: [],
        };
        addUserData(makeObjectShorten(userObject))
          .then(() => {
            bUserUpdating.current = false;
            userRefetch();
          })
          .catch((err: any) => {
            console.error(err);
          });
      }
    }
  }

  const listQuestionnairesData = [...data.listQuestionnaires.items];
  listQuestionnairesData.sort(
    (el1: any, el2: any) => el1.priority - el2.priority,
  );
  const nowQuestionnaire = listQuestionnairesData[page];
  const nowSelectedData = answerRespond[page];
  const totalPage = listQuestionnairesData.length;

  const updateNowUserQuestion = (nowQuestions: string[]) => {
    const frontData = answerRespond.slice(0, page).map((el: any) => ({
      title: el.title,
      answers: el.answers,
    }));
    const backData = answerRespond
      .slice(page + 1, answerRespond.length)
      .map((el: any) => ({
        title: el.title,
        answers: el.answers,
      }));
    const nowQuestion = {
      title: nowQuestionnaire.questionTitle,
      answers: [...nowQuestions],
    };
    const newData = [...frontData, nowQuestion, ...backData];
    setanswerRespond(newData);
  };

  const onRightClick = (nowQuestions: string[]) => () => {
    updateNowUserQuestion(nowQuestions);
    setPage((prevPage) => {
      if (prevPage < totalPage - 1) {
        return prevPage + 1;
      }
      setResultOpen(true);
      return prevPage;
    });
  };

  const onLeftClick = (nowQuestions: string[]) => () => {
    updateNowUserQuestion(nowQuestions);
    setPage((prevPage) => {
      if (prevPage !== 0) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const onProgressBarListClick = (e: any, nowQuestions: string[]) => {
    updateNowUserQuestion(nowQuestions);
    setPage(Number(e.target.id));
  };

  const setQuestionList = (): string[] => {
    if (page === 1) {
      let questionList = [];
      switch (answerRespond[0].answers[0]) {
        case '프론트엔드':
          questionList = [
            'React',
            'TypeScript',
            'Angular',
            'Vue',
            'Ember',
            'Node',
            'Nuxt',
            'Next',
            'etc',
          ];
          break;
        case '백엔드':
          questionList = ['Flask', 'Django', 'Spring', 'Express', 'Koa', 'etc'];
          break;
        case '안드로이드':
          questionList = ['Android'];
          break;
        case 'IOS':
          questionList = ['Swift', 'Object-C', 'etc'];
          break;
        case 'AI':
          questionList = ['AI'];
          break;
        case '데이터':
          questionList = ['DATA'];
          break;
        case 'Devops':
          questionList = ['Devops'];
          break;
        default:
          questionList = [...nowQuestionnaire.questionList];
          break;
      }
      return questionList;
    }
    return nowQuestionnaire.questionList;
  };

  const onCloseResult = () => {
    setResultOpen(false);
  };

  return (
    <BaseTemplate>
      {resultOpen ? (
        <ResultComponent
          userId={userData?.getUser.items[0].id}
          surveyCompleted={userData?.getUser.items[0].surveyCompleted}
          answerRespond={answerRespond}
          onCloseResult={onCloseResult}
        />
      ) : (
        <S.SurveyWrapper>
          <S.SurveyPage>
            <Questionnaire
              key={nowQuestionnaire.id}
              question={nowQuestionnaire.questionTitle}
              questionList={setQuestionList()}
              bDuplicateSelect={nowQuestionnaire.bDuplicate}
              selectedData={nowSelectedData.answers}
              leftOnClick={onLeftClick}
              rightOnClick={onRightClick}
              currentPage={page + 1}
              totalPage={totalPage}
              onClickList={onProgressBarListClick}
              listQuestionnairesData={listQuestionnairesData}
            />
          </S.SurveyPage>
        </S.SurveyWrapper>
      )}
    </BaseTemplate>
  );
};

export default Survey;

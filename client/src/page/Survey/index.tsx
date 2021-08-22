import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { listQuestionnaires, getUser } from 'graphql/queries';
import { createUser, updateUser } from 'graphql/mutations';
import BaseTemplate from 'page/BaseTemplate';
import Questionnaire from 'component/orgamisms/Questionnaire';
import * as S from './style';

const firstInput = Array(12).fill({ title: '', answers: [] });
const Survey = ({ className, isLoggedIn }: any) => {
  const { loading, error, data } = useQuery(
    gql`
      ${listQuestionnaires}
    `,
  );

  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login');
    }
  }, [isLoggedIn]);

  const [addUserData] = useMutation(
    gql`
      ${createUser}
    `,
  );
  const [updateUserData] = useMutation(
    gql`
      ${updateUser}
    `,
  );

  const bUserUpdating = useRef<boolean>(false);

  const [page, setPage] = useState<number>(0);

  if (userError) {
    console.error('userError', userError);
  }
  if (error) {
    console.error('error : ', error);
  }

  if (loading) {
    return (
      <S.LoadContainer>
        <S.LoadingComponent />
      </S.LoadContainer>
    );
  }

  if (!userLoading && !userError) {
    if (userData) {
      if (userData.getUser && userData.getUser.items?.length !== 0) {
        // console.log('userData : ', userData);
      } else if (bUserUpdating.current === false) {
        bUserUpdating.current = true;
        addUserData({
          variables: {
            input: {
              question: firstInput,
              mail: [],
              haveTeam: false,
              surveyCompleted: false,
              personState: '팀 구하는 중',
              teamList: [],
            },
          },
        })
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

  if (userLoading || bUserUpdating.current || !userData?.getUser) {
    return (
      <S.LoadContainer>
        <S.LoadingComponent />
      </S.LoadContainer>
    );
  }

  const listQuestionnairesData = [...data.listQuestionnaires.items];
  listQuestionnairesData.sort(
    (el1: any, el2: any) => el1.priority - el2.priority,
  );
  const nowQuestionnaire = listQuestionnairesData[page];
  const selectedData = userData.getUser?.items[0]?.question;
  const nowSelectedData = selectedData[page];
  const totalPage = listQuestionnairesData.length;

  const updateNowUserQuestion = (nowQuestions: string[]) => {
    const frontData = selectedData.slice(0, page).map((el: any) => ({
      title: el.title,
      answers: el.answers,
    }));

    const backData = selectedData
      .slice(page + 1, selectedData.length)
      .map((el: any) => ({
        title: el.title,
        answers: el.answers,
      }));
    const nowQuestion = {
      title: nowQuestionnaire.questionTitle,
      answers: [...nowQuestions],
    };
    const newData = [...frontData, nowQuestion, ...backData];
    updateUserData({
      variables: {
        input: {
          id: userData.getUser.items[0].id,
          question: newData,
        },
      },
    });
  };

  const onRightClick = (nowQuestions: string[]) => () => {
    updateNowUserQuestion(nowQuestions);
    setPage((prevPage) => {
      if (prevPage < totalPage - 1) {
        return prevPage + 1;
      }
      history.push('/result');
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
    if (nowQuestionnaire.questionBrief === 'Available Stack') {
      let questionList = [];
      switch (selectedData[0].answers[0]) {
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

  return (
    <BaseTemplate>
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
    </BaseTemplate>
  );
};

export default Survey;

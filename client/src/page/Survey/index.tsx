import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { listQuestionnaires, getUser } from 'graphql/queries';
import { createUser, updateUser } from 'graphql/mutations';

import Questionnaire from 'component/orgamisms/Questionnaire';
import * as S from './style';

const firstInput = [
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
  { title: '', answers: [] },
];

function Survey() {
  const {
    loading, error, data, refetch,
  } = useQuery(gql`${listQuestionnaires}`);

  const {
    loading: userLoading, error: userError, data: userData, refetch: userRefetch,
  } = useQuery(gql`${getUser}`);

  const history = useHistory();

  const [addUserData] = useMutation(gql`${createUser}`);
  const [updateUserData] = useMutation(gql`${updateUser}`);

  const bUserUpdating = useRef<boolean>(false);

  const [page, setPage] = useState<number>(0);

  if (userError) {
    console.error('userError', userError);
  }
  if (error) {
    console.error('error : ', error);
  }

  if (loading) {
    return (<div>loading</div>);
  }

  if (!userLoading && !userError) {
    if (userData) {
      if (userData.getUser.items.length !== 0) {
        console.log('userData : ', userData);
      } else if (bUserUpdating.current === false) {
        const userId = 'usergithubId'; // TODO 깃헙아이디입력받게하기
        bUserUpdating.current = true;
        addUserData({
          variables: {
            input: {
              userId,
              question: firstInput,
            },
          },
        }).then(() => {
          bUserUpdating.current = false;
          userRefetch();
        }).catch((err: any) => {
          console.error(err);
        });
      }
    }
  }

  if (userLoading || bUserUpdating.current || !userData) {
    return <>유저로딩중</>;
  }

  const listQuestionnairesData = [...data.listQuestionnaires.items];
  listQuestionnairesData.sort((el1: any, el2: any) => el1.priority - el2.priority);
  const nowQuestionnaire = listQuestionnairesData[page];
  const selectedData = userData.getUser?.items[0]?.question;
  const nowSelectedData = selectedData[page];
  const totalPage = listQuestionnairesData.length;

  const updateNowUserQuestion = (nowQuestions: string[]) => {
    const frontData = selectedData.slice(0, page).map((el : any) => ({
      title: el.title,
      answers: el.answers,
    }));

    const backData = selectedData.slice(page + 1, selectedData.length).map((el : any) => ({
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
          userId: userData.getUser.items[0].userId,
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

  return (
    <S.SurveyPage>
      <Questionnaire
        key={nowQuestionnaire.id}
        question={nowQuestionnaire.questionTitle}
        questionList={nowQuestionnaire.questionList}
        bDuplicateSelect={nowQuestionnaire.bDuplicate}
        selectedData={nowSelectedData.answers}
        leftOnClick={onLeftClick}
        rightOnClick={onRightClick}
        currentPage={page + 1}
        totalPage={totalPage}
      />
    </S.SurveyPage>
  );
}

export default Survey;
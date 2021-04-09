import React, { useState, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { listQuestionnaires, getUser } from 'graphql/queries';
import { createUser, updateUser } from 'graphql/mutations';

import Questionnaire from 'component/orgamisms/Questionnaire';
import * as S from './style';

function Survey() {
  const {
    loading, error, data, refetch,
  } = useQuery(gql`${listQuestionnaires}`);

  const {
    loading: userLoading, error: userError, data: userData, refetch: userRefetch,
  } = useQuery(gql`${getUser}`);

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

  if (userLoading) {
    return <>유저로딩중</>;
  }

  const nowQuestionnaire = data.listQuestionnaires.items[page];
  const selectedData = userData.getUser.items[0].question;
  const nowSelectedData = selectedData[page];
  const totalPage = data.listQuestionnaires.items.length;

  const updateNowUserQuestion = (nowQuestions: string[]) => {
    const frontData = selectedData.slice(0, page);
    const backData = selectedData.slice(page + 1, selectedData.length);
    const newData = [...frontData, [...nowQuestions], ...backData];
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

  if (!userLoading && !userError) {
    if (userData) {
      if (userData.getUser.items.length !== 0) {
        console.log('userData : ', userData);
      } else if (bUserUpdating.current === false) {
        const userId = 'pkiop';
        const something = [['React', 'Vue.js'], ['부전공']];
        bUserUpdating.current = true;
        addUserData({
          variables: {
            input: {
              userId,
              question: something,
            },
          },
        }).then(() => {
          bUserUpdating.current = false;
          userRefetch();
        });
      }
    }
  }

  return (
    <S.SurveyPage>
      <Questionnaire
        key={nowQuestionnaire.id}
        question={nowQuestionnaire.questionTitle}
        questionList={nowQuestionnaire.questionList}
        bDuplicateSelect={nowQuestionnaire.bDuplicate}
        selectedData={nowSelectedData}
        leftOnClick={onLeftClick}
        rightOnClick={onRightClick}
        currentPage={page + 1}
        totalPage={totalPage}
      />
    </S.SurveyPage>
  );
}

export default Survey;

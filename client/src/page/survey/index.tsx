import React, { useState, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { listQuestionnaires, getUser } from 'graphql/queries';
import { createUser } from 'graphql/mutations';
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
  const nowSelectedData = userData.getUser.items[0].question[page];
  const totalPage = data.listQuestionnaires.items.length;

  const onIncrease = () => {
    setPage((prevPage) => {
      if (prevPage < totalPage - 1) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };

  const onDecrease = () => {
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
        leftOnClick={onDecrease}
        rightOnClick={onIncrease}
        currentPage={page + 1}
        totalPage={totalPage}
      />
    </S.SurveyPage>
  );
}

export default Survey;

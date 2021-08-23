import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IAnswers } from 'component/molecules/QuestionRespond';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateUser } from 'graphql/mutations';
import { getUser } from 'graphql/queries';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import Button from 'component/atoms/Button';
import * as S from './style';

interface IQuestionResult {
  className?: string;
  answerRespond: IAnswers[];
  userId: string;
  surveyCompleted: boolean;
  onCloseResult: () => void;
}

function QuestionResult({
  answerRespond,
  className,
  userId,
  surveyCompleted,
  onCloseResult,
}: IQuestionResult) {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmFunction, setConfirmFunction] = useState<any>(() => {});

  const openModal = () => {
    const filterArray: number[] = [];
    answerRespond.forEach((answer: IAnswers, index: number) => {
      if (answer.answers.length < 1 || answer.answers[0].length < 1) {
        filterArray.push(index);
      }
    });
    if (filterArray.length > 0) {
      setConfirmText(
        `${filterArray.join()}번째 설문을 완료해주시고 등록버튼을 다시 눌러주세요. 확인 버튼을 누르면 돌아갑니다.`,
      );
      setConfirmFunction(() => () => {
        history.push('/survey');
      });
    } else {
      setConfirmText(
        surveyCompleted ? '업데이트 하시겠습니까?' : '등록하시겠습니까?',
      );
      setConfirmFunction(() => confirmSubmit);
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const { refetch } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const [updateUserData] = useMutation(
    gql`
      ${updateUser}
    `,
  );

  const QuestionRespondList = answerRespond.map((answer: IAnswers) => (
    <S.QuestionRespond
      key={answer.title}
      title={answer.title}
      answers={answer.answers}
    />
  ));

  const confirmSubmit = async () => {
    await updateUserData({
      variables: {
        input: {
          id: userId,
          surveyCompleted: true,
        },
      },
    });
    await refetch();
    history.push('/dashboard/personal');
  };

  return (
    <>
      {modalOpen && (
        <ConfirmModal
          text={confirmText}
          close={closeModal}
          onClickConfirm={confirmFunction}
        />
      )}
      <S.QuestionResult className={className}>
        {QuestionRespondList}
      </S.QuestionResult>
      <S.Btn>
        <Button onClick={onCloseResult} size="biglarge" color="gray">
          돌아가기
        </Button>
        <Button
          className="confirm"
          size="biglarge"
          color="yellow"
          onClick={openModal}
        >
          {!surveyCompleted ? '설문 결과 등록하기' : '설문 업데이트하기'}
        </Button>
      </S.Btn>
    </>
  );
}

export default QuestionResult;

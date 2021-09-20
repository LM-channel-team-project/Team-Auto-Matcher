import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Answers } from 'types';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from 'graphql/mutations';
import { GET_USER } from 'graphql/queries';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import Button from 'component/atoms/Button';
import * as S from './style';

interface IQuestionResult {
  className?: string;
  answerRespond: Answers[];
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
    answerRespond.forEach((answer: Answers, index: number) => {
      if (answer.answers.length < 1 || answer.answers[0].length < 1) {
        filterArray.push(index + 1);
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

  const { refetch } = useQuery(GET_USER);

  const [updateUserData] = useMutation(UPDATE_USER);

  const QuestionRespondList = answerRespond.map(
    (answer: Answers) =>
      answer.title.length > 0 && (
        <S.QuestionRespond
          key={answer.title}
          title={answer.title}
          answers={
            answer.answers.length > 0 ? answer.answers : ['응답 하지 않음']
          }
        />
      ),
  );

  const confirmSubmit = async () => {
    if (!surveyCompleted) {
      await updateUserData({
        variables: {
          input: {
            id: userId,
            question: answerRespond,
            surveyCompleted: true,
          },
        },
      });
    } else {
      updateUserData({
        variables: {
          input: {
            id: userId,
            question: answerRespond,
          },
        },
      });
    }

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
        <Button onClick={onCloseResult} size="biglarge" color="white">
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

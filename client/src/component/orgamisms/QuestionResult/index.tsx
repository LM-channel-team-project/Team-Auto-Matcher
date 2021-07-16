import React from 'react';
import { IAnswers } from 'component/molecules/QuestionRespond';
import { gql, useMutation, useQuery } from '@apollo/client';
import { createPerson, updateUser, updatePerson } from 'graphql/mutations';
import { listPersonDashboard } from 'graphql/queries';
import ConfirmModal from 'component/orgamisms/ConfirmModal';
import Button from 'component/atoms/Button';
import * as S from './style';

interface IQuestionResult {
  answerRespond: IAnswers[];
  className?: string;
  id?: string;
  surveyCompleted?: boolean;
}

function QuestionResult({
  answerRespond,
  className,
  id,
  surveyCompleted,
}: IQuestionResult) {
  const { refetch } = useQuery(
    gql`
      ${listPersonDashboard}
    `,
  );
  const [createPersonData] = useMutation(
    gql`
      ${createPerson}
    `,
  );
  const [updateUserData] = useMutation(
    gql`
      ${updateUser}
    `,
  );
  const [updatePersonData] = useMutation(
    gql`
      ${updatePerson}
    `,
  );

  const QuestionRespondList = answerRespond.map((answer: IAnswers) => (
    <S.QuestionRespond
      key={answer.title}
      title={answer.title}
      answers={answer.answers}
    />
  ));

  const onSubmit = async () => {
    const filterArray: number[] = [];
    answerRespond.forEach((answer: IAnswers, index: number) => {
      if (answer.answers.length < 1 || answer.answers[0].length < 1) {
        filterArray.push(index);
      }
    });
    if (filterArray.length > 0) {
      alert(
        `${filterArray.join()}번째 설문을 완료해주시고 등록버튼을 눌러주세요. 확인 버튼을 누르면 돌아갑니다.`,
      );
      window.location.href = '/survey';
      return;
    }
    if (!surveyCompleted) {
      await createPersonData({
        variables: {
          input: {
            id,
            name: answerRespond[11].answers[0],
            field: answerRespond[0].answers[0],
            skills: answerRespond[1].answers,
            devExp: answerRespond[2].answers[0],
            contents: {
              title: answerRespond[8].title,
              text: answerRespond[8].answers[0],
            },
            team: '팀 구하는중',
            outline: answerRespond[10].answers[0],
            periods: answerRespond[3].answers[0],
            times: answerRespond[4].answers,
            contact: answerRespond[5].answers[0],
            hasCoWork: answerRespond[6].answers[0] === '경험 없음',
            priority: answerRespond[7].answers,
            project: answerRespond[9].answers[0],
          },
        },
      });
      updateUserData({
        variables: {
          input: {
            id,
            surveyCompleted: true,
          },
        },
      });
    } else {
      await updatePersonData({
        variables: {
          input: {
            id,
            name: answerRespond[11].answers[0],
            field: answerRespond[0].answers[0],
            skills: answerRespond[1].answers,
            devExp: answerRespond[2].answers[0],
            contents: {
              title: answerRespond[8].title,
              text: answerRespond[8].answers[0],
            },
            outline: answerRespond[10].answers[0],
            periods: answerRespond[3].answers[0],
            times: answerRespond[4].answers,
            contact: answerRespond[5].answers[0],
            hasCoWork: answerRespond[6].answers[0] === '경험 없음',
            priority: answerRespond[7].answers,
          },
        },
      });
    }
    refetch();
    alert('확정 되었습니다.');
    window.location.href = '/dashboard/personal';
  };

  return (
    <>
      <S.QuestionResult className={className}>
        {QuestionRespondList}
      </S.QuestionResult>
      <S.Btn>
        <Button
          className="confirm"
          size="biglarge"
          color="gray"
          onClick={onSubmit}
        >
          {!surveyCompleted
            ? '설문 결과 등록하기'
            : '등록된 데이터 업데이트하기'}
        </Button>
        {/* <ConfirmModal title="내용을 저장 하시겠습니까 ?" /> */}
      </S.Btn>
    </>
  );
}

export default QuestionResult;

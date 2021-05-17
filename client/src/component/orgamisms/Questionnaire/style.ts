import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import MultiCheckboxComponent from 'component/molecules/MultiCheckbox';
import PageCntComponent from 'component/molecules/PageCnt';
import DirectionNavComponent from 'component/molecules/DirectionNav';

export const Questionnaire = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 15px;
  min-width: 500px;
  padding: 1.6rem;
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  font-weight: 600;

  font-size: 3rem;

  margin: 1.6rem 0;
`;

export const PageCnt = styled(PageCntComponent)`
`;

export const MultiCheckbox = styled(MultiCheckboxComponent)`
  margin-bottom: 1.6rem;
`;

export const DirectionNav = styled(DirectionNavComponent)`
  justify-content: center;
`;

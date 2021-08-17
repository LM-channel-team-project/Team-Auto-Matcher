import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import MultiCheckboxComponent from 'component/molecules/MultiCheckbox';
import ProgressComponent from 'component/molecules/ProgressBar';
import DirectionNavComponent from 'component/molecules/DirectionNav';

export const Questionnaire = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 1em;
  padding: 1.6rem;
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  font-weight: 600;

  font-size: 2rem;

  margin: 0.6rem 0;
`;

export const ProgressBar = styled(ProgressComponent)`
`;

export const MultiCheckbox = styled(MultiCheckboxComponent)`
  margin-bottom: 1.6rem;
`;

export const DirectionNav = styled(DirectionNavComponent)`
  justify-content: center;
`;

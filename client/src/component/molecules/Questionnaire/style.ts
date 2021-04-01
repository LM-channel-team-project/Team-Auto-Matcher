import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import MultiCheckboxComponent from 'component/molecules/MultiCheckbox';

export const Questionnaire = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1rem;

  border: 0.2rem solid black;
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  text-align: center; 

  margin-bottom: 1rem;
`;

export const MultiCheckbox = styled(MultiCheckboxComponent)`
`;

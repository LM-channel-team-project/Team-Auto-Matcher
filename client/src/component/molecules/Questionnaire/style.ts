import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import MultiCheckboxComponent from 'component/molecules/MultiCheckbox';

export const Questionnaire = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1.6rem;

  border: 0.4rem solid black;
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  text-align: center; 

  margin-bottom: 1.6rem;
`;

export const MultiCheckbox = styled(MultiCheckboxComponent)`
`;

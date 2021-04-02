import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import CheckboxComponent from 'component/atoms/Checkbox';

export const MultiCheckbox = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  user-select: none;
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  padding: 0.2rem 0.6rem;
`;

export const Checkbox = styled(CheckboxComponent)`
  margin-right: 0.6rem;
`;

export const Wrapper = styled.div`
  border: 0.14rem solid black;
  display: flex;
  align-items: center;
  margin: 0.2rem 0.8rem;
`;

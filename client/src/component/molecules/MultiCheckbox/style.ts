import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import CheckboxComponent from 'component/atoms/Checkbox';

export const MultiCheckbox = styled.div`
  display: flex;
  justify-content: center;
;
`;

export const Checkbox = styled(CheckboxComponent)`
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  width: 100%;
  height: 100%;

  ${Checkbox}:checked ~ & {
    background-color: rgba(0,0,0,0.2);
  }
  
  padding: 0.8rem 2rem;
`;

export const Wrapper = styled.div`
  border: 0.2rem solid black;
  display: flex;
  align-items: center;
  margin: 0.2rem 0.8rem;

  cursor: pointer;
  user-select: none;
`;

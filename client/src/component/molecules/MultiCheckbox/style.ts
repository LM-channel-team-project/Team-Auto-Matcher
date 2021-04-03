import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import CheckboxComponent from 'component/atoms/Checkbox';

export const MultiCheckbox = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, minmax(auto, 20rem));
  row-gap: 2rem;
  column-gap: 2rem;
`;

export const Checkbox = styled(CheckboxComponent)`
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    text-align: center;
    font-size: 3.2rem;
  }

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

  cursor: pointer;
  user-select: none;
`;

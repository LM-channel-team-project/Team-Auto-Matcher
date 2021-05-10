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
  transition: all .2s;

  > span {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 500;
  }
  border-radius: 5px;

  width: 100%;
  height: 100%;

  ${Checkbox}:checked ~ & {
    background-color: red;
    box-shadow: 5px 5px 5px;
  }

  ${Checkbox}:checked ~ & span {
    color: white;
  }
  
  padding: 0.8rem 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  transition: all .2s;

  &:hover{
    background-color: red;
    box-shadow: 5px 5px 5px;
  }

  &:hover span{
    color: white;
  }

  cursor: pointer;
  user-select: none;
`;

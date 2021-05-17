import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import CheckboxComponent from 'component/atoms/Checkbox';

export const MultiCheckbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 1rem;
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
  align-items: center;
  transition: all .2s;

  > span {
    text-align: left;
    font-size: 2.2rem;
    font-weight: 500;
  }
  border-radius: 5px;

  width: 100%;
  height: 100%;

  ${Checkbox}:checked ~ & {
    background-color: #cc0001;
    box-shadow: 3px 3px 3px;
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
    background-color: #cc0001;
    box-shadow: 3px 3px 3px;
  }

  &:hover span{
    color: white;
  }

  cursor: pointer;
  user-select: none;
`;

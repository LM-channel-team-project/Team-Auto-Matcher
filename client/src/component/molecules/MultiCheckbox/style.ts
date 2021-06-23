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
  transition: all 0.2s;

  > span {
    text-align: left;
    font-size: 2.2rem;
    font-weight: 500;
  }
  border-radius: 0.5em;

  width: 100%;
  height: 100%;

  ${Checkbox}:checked ~ & {
    background-color: #cc0001;
    box-shadow: 0.2rem 0.2rem 0.3rem;
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
  border-radius: 0.5em;
  transition: all 0.2s;

  &:hover {
    background-color: #cc0001;
    box-shadow: 0.2rem 0.2rem 0.3rem;
  }

  &:hover span {
    color: white;
  }

  cursor: pointer;
  user-select: none;
`;

export const Input = styled.textarea`
  width: 100%;
  font-weight: 600;
  font-size: 1.5em;
  box-shadow: 0 0.1em 0.3em;
  margin-bottom: 1.6rem;
`;

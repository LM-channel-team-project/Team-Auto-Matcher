import styled from 'styled-components';
import QuestionRespondComponent from 'component/molecules/QuestionRespond';

export const QuestionResult = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 1.2em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7f8c8d;
    border-radius: 1em;
  }
  &::-webkit-scrollbar-track {
    background-color: #dfe6e9;
    border-radius: 1em;
  }
  height: 67em;
  padding: 1.6rem;
  margin-bottom: 3em;
  @media screen and (max-width: 470px) {
    height: 60em;
  }
`;
export const Btn = styled.div`
  display: flex;
  > .confirm {
    margin-left: 1em;
  }
`;
export const QuestionRespond = styled(QuestionRespondComponent)``;

export default {};

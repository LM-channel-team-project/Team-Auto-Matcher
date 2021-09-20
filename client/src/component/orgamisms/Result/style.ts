import styled from 'styled-components';
import QuestionResultComponent from 'component/orgamisms/QuestionResult';

export const ResultPage = styled.div`
  position: absolute;
  top: calc(50% - 35rem);
  left: calc(50% - 65rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e9e9e9;
  border-radius: 1em;
  z-index: 100;
  width: 130rem;
  height: 70rem;
  @media screen and (max-width: 85rem) {
    width: 100rem;
    height: 60rem;
    left: calc(50% - 50rem);
    top: calc(50% - 30rem);
  }
  @media screen and (max-width: 63rem) {
    width: 80rem;
    left: calc(50% - 40rem);
  }
  @media screen and (max-width: 53rem) {
    width: 70rem;
    left: calc(50% - 35rem);
  }
  @media screen and (max-width: 43rem) {
    width: 50rem;
    height: 40rem;
    left: calc(50% - 25rem);
    top: calc(50% - 20rem);
  }
`;

export const Title = styled.div`
  margin-top: 4rem;
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1em;
`;

export const QuestionResult = styled(QuestionResultComponent)``;

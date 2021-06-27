import styled from 'styled-components';
import QuestionResultComponent from 'component/orgamisms/QuestionResult';

export const ResultPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .title {
    margin-top: 4rem;
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 1em;
  }
`;

export const QuestionResult = styled(QuestionResultComponent)``;

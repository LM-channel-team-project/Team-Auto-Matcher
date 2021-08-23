import styled from 'styled-components';
import Loading from 'component/atoms/Loading';
import QuestionResultComponent from 'component/orgamisms/QuestionResult';

export const ResultPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
    margin-top: 4rem;
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 1em;
`;

export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20%;
`;

export const LoadingComponent = styled(Loading)``;

export const QuestionResult = styled(QuestionResultComponent)``;

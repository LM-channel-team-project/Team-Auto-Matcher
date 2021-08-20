import styled from 'styled-components';
import Loading from 'component/atoms/Loading';

export const SurveyPage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const SurveyWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20%;
`;

export const LoadingComponent = styled(Loading)``;

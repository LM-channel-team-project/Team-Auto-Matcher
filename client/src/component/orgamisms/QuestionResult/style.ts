import styled from 'styled-components';
import QuestionRespondComponent from 'component/molecules/QuestionRespond';

export const QuestionResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1.6rem;

  > .header {
    display: flex;
    justify-content: space-between;
    margin: 0 3rem;
  }
`;

export const QuestionRespond = styled(QuestionRespondComponent)``;

export default {};

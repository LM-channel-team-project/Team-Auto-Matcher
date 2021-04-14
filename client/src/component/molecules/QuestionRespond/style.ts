import styled from 'styled-components';

export const QuestionRespond = styled.div`
  display: flex;
  flex-direction: column;

  > .title {
    font-size: 4rem;
    font-weight: 600;
  }

  > .wrapper {
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 5rem;
    & > .questionRespond {
      font-size: 3rem;
      margin-right: 4rem;
      border: 0.2rem solid black;
      border-radius: 1.2rem; 
      padding: 0.6rem;
    }
  }
`;

export default QuestionRespond;

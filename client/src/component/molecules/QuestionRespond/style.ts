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

    & > .questionRespond {
      font-size: 2rem;
      color: blue;
      margin-right: 2rem;
    }
  }
`;

export default QuestionRespond;

import styled from 'styled-components';

export const QuestionRespond = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 2em;
  padding: 3em;
  box-shadow: 0 0.1em 1em rgba(0, 0, 0, 0.12), 0 0.5em 0.6em rgba(0, 0, 0, 0.24);
  margin-bottom: 3em;

  > .title {
    font-size: 3rem;
    font-weight: bold;
  }

  > .wrapper {
    display: flex;
    margin-top: 3rem;
    & > .questionRespond {
      font-size: 2.5rem;
      text-align: center;
      font-weight: bold;
      margin-right: 4rem;
      background-color: #dfe6e9;
      border-radius: 1.2rem;
      padding: 1.6rem;
    }
  }
`;

export default QuestionRespond;

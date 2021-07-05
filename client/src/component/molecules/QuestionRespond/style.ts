import styled from 'styled-components';

export const QuestionRespond = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 2em;
  padding: 1.8em;
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
  @media screen and (max-width: 1370px) {
    > .title {
    }
    > .wrapper {
      & > .questionRespond {
        font-size: 2rem;
        padding: 1rem;
      }
    }
  }
  @media screen and (max-width: 1140px) {
    > .title {
      font-size: 2.5em;
    }
    > .wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: left;
      & > .questionRespond {
        font-size: 1.5rem;
        padding: 1rem;
        margin-bottom: 1em;
      }
    }
  } ;
`;

export default QuestionRespond;

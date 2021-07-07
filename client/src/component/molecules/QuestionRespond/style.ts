import styled from 'styled-components';

export const QuestionRespond = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 2em;
  padding: 1.8em;
  box-shadow: 0 0.1em 1em rgba(0, 0, 0, 0.12), 0 0.5em 0.6em rgba(0, 0, 0, 0.24);
  margin-bottom: 3em;
  width: 120em;
  > .title {
    font-size: 3.6rem;
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
      padding: 1rem;
      &:last-child {
        margin-right: 0rem;
      }
    }
  }

  @media screen and (max-width: 85rem) {
    width: 90em;
    > .title {
      font-size: 3.6rem;
    }
    > .wrapper {
      margin-top: 1rem;
      display: flex;
      flex-flow: row wrap;
      justify-content: left;
      & > .questionRespond {
        font-size: 2rem;
        padding: 1rem;
        margin-top: 1em;
      }
    }
  }

  @media screen and (max-width: 63rem) {
    width: 70em;
    > .title {
      font-size: 3rem;
    }
  }
  @media screen and (max-width: 53rem) {
    width: 60em;
    > .title {
      font-size: 2.8rem;
    }
  }

  @media screen and (max-width: 43rem) {
    width: 44em;
    > .title {
      font-size: 2.2em;
    }
    > .wrapper {
      margin-top: 3rem;
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      & > .questionRespond {
        width: 20em;
        font-size: 2em;
        margin: 0em 0em 1em;
      }
    }
  }
`;

export default QuestionRespond;

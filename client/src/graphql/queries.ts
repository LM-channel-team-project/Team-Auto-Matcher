/* tslint:disable */
/* eslint-disable */

export const getQuestionnaire = /* GraphQL */ `
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      questionTitle
      questionList
      bDuplicate
    }
  }
`;
export const listQuestionnaires = /* GraphQL */ `
  query ListQuestionnaires($nextToken: String) {
    listQuestionnaires(nextToken: $nextToken) {
      items {
        id
        questionTitle
        questionList
        bDuplicate
      }
      nextToken
    }
  }
`;

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
export const listQuestionnaire = /* GraphQL */ `
  query ListQuestionnaire(
    $date: AWSDate
  ) {
    listQuestionnaire() {
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

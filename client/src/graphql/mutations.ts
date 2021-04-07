/* tslint:disable */
/* eslint-disable */

export const createUser = /* GraphQL */ `
  mutation createUser(
      $input: CreateUserInput!
    ) {
    createUser(input: $input) {
      id
      userId 
      question
    }
  }
`;

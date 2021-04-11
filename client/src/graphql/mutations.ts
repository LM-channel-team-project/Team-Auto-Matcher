/* tslint:disable */
/* eslint-disable */

export const createUser = /* GraphQL */ `
  mutation createUser(
      $input: CreateUserInput!
    ) {
    createUser(input: $input) {
      id
      userId 
      question {
        title
        answers
      }
    }
  }
`;

export const updateUser= /* GraphQL */ `
  mutation updateUser(
      $input: UpdateUserInput!
    ) {
    updateUser(input: $input) {
      id
      userId 
      question {
        title
        answers
      }
    }
  }
`;

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

export const createTeam = /* GraphQL */ `
  mutation createTeam(
      $input: CreateTeamInput!
    ) {
    createTeam(input: $input) {
      name
      people
      skills
      outline
      contents {
        title
        text
      }
      state
    }
  }
`;
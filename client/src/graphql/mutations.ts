/* tslint:disable */
/* eslint-disable */

export const createUser = /* GraphQL */ `
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      userId
      question {
        title
        answers
      }
      surveyCompleted
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      userId
      question {
        title
        answers
      }
      surveyCompleted
    }
  }
`;

export const createTeam = /* GraphQL */ `
  mutation createTeam($input: CreateTeamInput!) {
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

export const createPerson = /* GraphQL */ `
  mutation createPerson($input: CreatePersonInput!) {
    createPerson(input: $input) {
      id
      field
      skills
      devExp
      name
      contents {
        title
        text
      }
      team
      outline
      periods
      times
      contact
      hasCoWork
      priority
    }
  }
`;

export const updatePerson = /* GraphQL */ `
  mutation updatePerson($input: UpdatePersonInput!) {
    updatePerson(input: $input) {
      id
      field
      skills
      devExp
      name
      contents {
        title
        text
      }
      team
      outline
      periods
      times
      contact
      hasCoWork
      priority
    }
  }
`;

/* tslint:disable */
/* eslint-disable */

export const createUser = /* GraphQL */ `
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      haveTeam
      surveyCompleted
      mail {
        from
        teamId
        type
        teamName
      }
      question {
        title
        answers
      }
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      haveTeam
      surveyCompleted
      mail {
        from
        teamId
        type
        teamName
      }
      question {
        title
        answers
      }
    }
  }
`;

export const createTeam = /* GraphQL */ `
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
      people
      skills
      outline
      owner
      contents {
        title
        text
      }
      state
    }
  }
`;

export const updateTeam = /* GraphQL */ `
  mutation updateTeam($input: UpdateTeamInput!) {
    updateTeam(input: $input) {
      id
      name
      people
      skills
      outline
      owner
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
      name
      skills
      outline
      contents {
        title
        text
      }
    }
  }
`;

export const updatePerson = /* GraphQL */ `
  mutation updatePerson($input: UpdatePersonInput!) {
    updatePerson(input: $input) {
      id
      name
      skills
      outline
      contents {
        title
        text
      }
    }
  }
`;

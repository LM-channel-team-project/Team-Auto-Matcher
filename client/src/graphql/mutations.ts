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
      surveyCompleted
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
      surveyCompleted
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

export const deleteTeam = /* GraphQL */ `
  mutation deleteTeam($input: DeleteTeamInput!) {
    deleteTeam(input: $input) {
      id
    }
  }
`;

export const createPerson = /* GraphQL */ `
  mutation createPerson($input: CreatePersonInput!) {
    createPerson(input: $input) {
      id
      name
      team
      field
      skills
      devExp
      periods
      times
      contact
      project
      hasCoWork
      priority
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
      team
      field
      skills
      devExp
      periods
      project
      times
      contact
      hasCoWork
      priority
      outline
      contents {
        title
        text
      }
    }
  }
`;

export const deletePerson = /* GraphQL */ `
  mutation deletePerson($input: DeletePersonInput!) {
    deletePerson(input: $input) {
      id
    }
  }
`;

/* tslint:disable */
/* eslint-disable */

export const createUser = /* GraphQL */ `
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      userId
      teamInfo {
        name
        skills
        outline
        state
        contents {
          title
          text
        }
      }
      surveyCompleted
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
      teamInfo {
        name
        skills
        outline
        state
        contents {
          title
          text
        }
      }
      surveyCompleted
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
      owner
      mail {
        devExp
        field
        from
        name
        outline
        skills
        state
        contents {
          title
          text
        }
      }
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
      mail {
        devExp
        field
        from
        name
        outline
        skills
        state
        contents {
          title
          text
        }
      }
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
      mail {
        devExp
        field
        from
        name
        outline
        skills
        state
        contents {
          title
          text
        }
      }
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
      name
      skills
      outline
      mail {
        devExp
        field
        from
        name
        outline
        skills
        state
        contents {
          title
          text
        }
      }
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

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
        date
      }
      question {
        title
        answers
      }
      surveyCompleted
      personState
      teamList {
        id
        name
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
        date
      }
      question {
        title
        answers
      }
      surveyCompleted
      personState
      teamList {
        id
        name
      }
    }
  }
`;

export const createTeam = /* GraphQL */ `
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
      people {
        id
        name
      }
      createdAt
      skills
      outline
      owner
      contents {
        title
        text
      }
      state
      comments {
        date
        owner
        comment
      }
    }
  }
`;

export const updateTeam = /* GraphQL */ `
  mutation updateTeam($input: UpdateTeamInput!) {
    updateTeam(input: $input) {
      id
      name
      people {
        id
        name
      }
      createdAt
      skills
      outline
      owner
      reponame
      contents {
        title
        text
      }
      state
      comments {
        date
        owner
        comment
      }
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

export const createNotice = /* GraphQL */ `
  mutation createNotice($input: CreateNoticeInput!) {
    createNotice(input: $input) {
      id
      title
      contents
      date
    }
  }
`;

export const deleteNotice = /* GraphQL */ `
  mutation deleteNotice($input: DeleteNoticeInput!) {
    deleteNotice(input: $input) {
      id
    }
  }
`;

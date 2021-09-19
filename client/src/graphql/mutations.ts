/* tslint:disable */
/* eslint-disable */
import { gql } from "@apollo/client";

export const CREATE_USER = gql`
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

export const UPDATE_USER = gql`
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

export const CREATE_TEAM = gql`
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
      name
    }
  }
}
`;

export const UPDATE_TEAM = gql`
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
      name
    }
  }
}
`;

export const DELETE_TEAM = gql`
mutation deleteTeam($input: DeleteTeamInput!) {
  deleteTeam(input: $input) {
    id
  }
}
`;

export const CREATE_NOTICE = gql`
mutation createNotice($input: CreateNoticeInput!) {
  createNotice(input: $input) {
    id
    title
    contents
    date
  }
}
`;

export const DELETE_NOTICE = gql`
mutation deleteNotice($input: DeleteNoticeInput!) {
  deleteNotice(input: $input) {
    id
  }
}
`;

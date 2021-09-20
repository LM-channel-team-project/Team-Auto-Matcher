/* tslint:disable */
/* eslint-disable */
import { gql } from "@apollo/client";

export const GET_QUESTIONNAIRE = gql`
query GetQuestionnaire($id: ID!) {
  getQuestionnaire(id: $id) {
    id
    questionTitle
    priority
    questionList
    bDuplicate
  }
}
`;

export const LIST_QUESTIONNAIRES = gql`
query ListQuestionnaires($nextToken: String) {
  listQuestionnaires(nextToken: $nextToken) {
    items {
      id
      questionTitle
      priority
      questionBrief
      questionList
      bDuplicate
    }
    nextToken
  }
}
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      items {
        id
        haveTeam
        surveyCompleted
        owner
        question {
          title
          answers
        }
        personState
        teamList {
          id
          name
        }
        mail {
          from
          teamId
          type
          teamName
          date
        }
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
query GetUserById($id: String!) {
  getUserById(id: $id) {
    id
    haveTeam
    surveyCompleted
    question {
      title
      answers
    }
    personState
    owner
    teamList {
      id
      name
    }
    mail {
      from
      teamId
      type
      teamName
      date
    }
  }
}
`;

export const LIST_USER = gql`
query ListUser($nextToken: String) {
  listUser(nextToken: $nextToken) {
    items {
      id
      haveTeam
      surveyCompleted
      question {
        title
        answers
      }
      personState
      teamList {
        id
        name
      }
      mail {
        from
        teamId
        type
        teamName
        date
      }
    }
    nextToken
  }
}
`;


export const LIST_TEAM_DASHBOARD = gql`
query ListTeamDashboard($nextToken: String) {
  listTeamDashboard(nextToken: $nextToken) {
    items {
      id
      name
      people {
        id
        name
      }
      skills
      outline
      state
      owner
      reponame
      contents {
        title
        text
      }
      createdAt
      comments {
        date
        owner
        comment
        name
      }
    }
    nextToken
  }
}
`;

export const GET_TEAM_DASHBOARD = gql`
query GetTeamDashboard($id: String!) {
  getTeamDashboard(id: $id) {
    id
    name
    people {
      id
      name
    }
    skills
    outline
    state
    owner
    reponame
    contents {
      title
      text
    }
    createdAt
    comments {
      date
      owner
      comment
      name
    }
  }
}
`;

export const LIST_NOTICE = gql`
query ListNotice($nextToken: String) {
  listNotice(nextToken: $nextToken) {
    items {
      id
      title
      contents
      date
    }
    nextToken
  }
}
`;


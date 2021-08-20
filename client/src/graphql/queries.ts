/* tslint:disable */
/* eslint-disable */

export const getQuestionnaire = /* GraphQL */ `
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

export const listQuestionnaires = /* GraphQL */ `
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

export const getUser = /* GraphQL */ `
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
        }
      }
    }
  }
`;

export const getUserById = /* GraphQL */ `
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
      }
    }
  }
`;

export const listUser = /* GraphQL */ `
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
        }
      }
      nextToken
    }
  }
`;

export const listTeamDashboard = /* GraphQL */ `
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
        contents {
          title
          text
        }
        createdAt
      }
      nextToken
    }
  }
`;

export const getTeamDashboard = /* GraphQL */ `
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
      contents {
        title
        text
      }
      createdAt
    }
  }
`;

export const listNotice = /* GraphQL */ `
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
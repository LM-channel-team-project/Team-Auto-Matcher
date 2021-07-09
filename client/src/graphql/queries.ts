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
        question {
          title
          answers
        }
        owner
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
      owner
      mail {
        from
        teamId
        type
        teamName
      }
    }
  }
`;

export const listTeamDashboard = /* GraphQL */ `
  query ListTeamDashboard($nextToken: String) {
    listTeamDashboard(nextToken: $nextToken) {
      items {
        id
        name
        people
        skills
        outline
        state
        owner
        contents {
          title
          text
        }
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
      people
      skills
      outline
      state
      owner
      contents {
        title
        text
      }
    }
  }
`;

export const listPersonDashboard = /* GraphQL */ `
  query ListPersonDashboard($nextToken: String) {
    listPersonDashboard(nextToken: $nextToken) {
      items {
        id
        name
        team
        field
        skills
        devExp
        periods
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
      nextToken
    }
  }
`;

export const getPersonDashboard = /* GraphQL */ `
  query GetPersonDashboard($id: String!) {
    getPersonDashboard(id: $id) {
      id
      name
      team
      field
      skills
      devExp
      periods
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

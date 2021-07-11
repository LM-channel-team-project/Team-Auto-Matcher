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
        surveyCompleted
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
      }
      nextToken
    }
  }
`;

/* tslint:disable */
/* eslint-disable */

export const listPersonDashboard = /* GraphQL */ `
  query ListPersonDashboard($nextToken: String) {
    listPersonDashboard(nextToken: $nextToken) {
      items {
        id
        name
        skills
        team
        outline
        field
        devExp
        contents {
          title
          text
        }
      }
      nextToken
    }
  }
`;

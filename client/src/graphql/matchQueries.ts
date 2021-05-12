/* tslint:disable */
/* eslint-disable */

export const listMatchWaitQueue = `
query listMatchWaitQueue($nextToken: String) {
  listMatchWaitQueue(nextToken: $nextToken) {
    items {
      id
      type
      name
      year
      stacks
      message
      state
    }
    nextToken
  }
}
`;

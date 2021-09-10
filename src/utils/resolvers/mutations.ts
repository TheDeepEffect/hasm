import gql from "graphql-tag";

export const LOG_IN = gql`
mutation login($loginUsername: String!, $loginPassword: String!) {
  login(username: $loginUsername, password: $loginPassword) {
    ... on InvalidUser {
      message
    }
    ... on AuthPayload {
      expiresAt
      user {
        id
        name
        email
        username
        profile_pic
      }
    }
  }
}`;

export const LOG_OUT = gql`
mutation logout {
  logout {
    ... on LogoutSuccess {
      message
    }
    ... on LogoutFailed {
      message
    }
  }
}`;
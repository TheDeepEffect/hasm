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

export const SIGN_UP = gql`
mutation signup($signupName: String!, $signupUsername: String!, $signupEmail: String!, $signupPassword: String!, $signupProfilePic: String) {
  signup(name: $signupName, username: $signupUsername, email: $signupEmail, password: $signupPassword, profile_pic: $signupProfilePic) {
    ... on UserAlreadyExists {
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
}`
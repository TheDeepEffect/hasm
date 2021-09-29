/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_InvalidUser {
  __typename: "InvalidUser";
  message: string;
}

export interface login_login_AuthPayload_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  email: string | null;
  username: string | null;
  profile_pic: string | null;
}

export interface login_login_AuthPayload {
  __typename: "AuthPayload";
  expiresAt: string | null;
  user: login_login_AuthPayload_user | null;
}

export type login_login = login_login_InvalidUser | login_login_AuthPayload;

export interface login {
  login: login_login | null;
}

export interface loginVariables {
  loginUsername: string;
  loginPassword: string;
}

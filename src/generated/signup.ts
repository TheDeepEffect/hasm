/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_UserAlreadyExists {
    __typename: 'UserAlreadyExists'
    message: string
}

export interface signup_signup_AuthPayload_user {
    __typename: 'User'
    id: string | null
    name: string | null
    email: string | null
    username: string | null
    profile_pic: string | null
}

export interface signup_signup_AuthPayload {
    __typename: 'AuthPayload'
    expiresAt: string | null
    user: signup_signup_AuthPayload_user | null
}

export type signup_signup =
    | signup_signup_UserAlreadyExists
    | signup_signup_AuthPayload

export interface signup {
    signup: signup_signup | null
}

export interface signupVariables {
    signupName: string
    signupUsername: string
    signupEmail: string
    signupPassword: string
    signupProfilePic?: string | null
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: logout
// ====================================================

export interface logout_logout_LogoutSuccess {
    __typename: 'LogoutSuccess'
    message: string
}

export interface logout_logout_LogoutFailed {
    __typename: 'LogoutFailed'
    message: string
}

export type logout_logout =
    | logout_logout_LogoutSuccess
    | logout_logout_LogoutFailed

export interface logout {
    logout: logout_logout | null
}

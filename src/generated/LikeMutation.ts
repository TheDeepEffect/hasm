/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LikeMutation
// ====================================================

export interface LikeMutation_like_user {
  __typename: "User";
  username: string | null;
}

export interface LikeMutation_like {
  __typename: "Like";
  id: string | null;
  user: LikeMutation_like_user | null;
}

export interface LikeMutation {
  like: LikeMutation_like | null;
}

export interface LikeMutationVariables {
  likePostId: string;
}

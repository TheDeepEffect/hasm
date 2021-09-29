/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: likes
// ====================================================

export interface likes_likes_user {
  __typename: "User";
  username: string | null;
}

export interface likes_likes {
  __typename: "Like";
  id: string | null;
  user: likes_likes_user | null;
}

export interface likes {
  likes: (likes_likes | null)[] | null;
}

export interface likesVariables {
  likesPostId: string;
}

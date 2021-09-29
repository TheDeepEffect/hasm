/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: latestComments
// ====================================================

export interface latestComments_latestComment_user {
  __typename: "User";
  username: string | null;
}

export interface latestComments_latestComment_post {
  __typename: "Post";
  id: string | null;
}

export interface latestComments_latestComment {
  __typename: "Comment";
  id: string | null;
  content: string | null;
  user: latestComments_latestComment_user | null;
  post: latestComments_latestComment_post | null;
}

export interface latestComments {
  latestComment: latestComments_latestComment | null;
}

export interface latestCommentsVariables {
  latestCommentIds?: string[] | null;
}

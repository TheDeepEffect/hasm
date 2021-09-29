/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addComment
// ====================================================

export interface addComment_addComment_user {
  __typename: "User";
  username: string | null;
}

export interface addComment_addComment {
  __typename: "Comment";
  id: string | null;
  content: string | null;
  user: addComment_addComment_user | null;
}

export interface addComment {
  addComment: addComment_addComment | null;
}

export interface addCommentVariables {
  addCommentContent: string;
  addCommentPostId: string;
}

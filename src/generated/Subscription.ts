/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: Subscription
// ====================================================

export interface Subscription_latestPost_author {
  __typename: "User";
  username: string | null;
  profile_pic: string | null;
}

export interface Subscription_latestPost_likes_user {
  __typename: "User";
  username: string | null;
}

export interface Subscription_latestPost_likes {
  __typename: "Like";
  id: string | null;
  user: Subscription_latestPost_likes_user | null;
}

export interface Subscription_latestPost_comments_user {
  __typename: "User";
  username: string | null;
}

export interface Subscription_latestPost_comments {
  __typename: "Comment";
  id: string | null;
  content: string | null;
  user: Subscription_latestPost_comments_user | null;
}

export interface Subscription_latestPost {
  __typename: "Post";
  id: string | null;
  url: string | null;
  description: string | null;
  isPrivate: boolean | null;
  createdAt: any | null;
  author: Subscription_latestPost_author | null;
  likes: (Subscription_latestPost_likes | null)[] | null;
  comments: (Subscription_latestPost_comments | null)[] | null;
}

export interface Subscription {
  latestPost: Subscription_latestPost | null;
}

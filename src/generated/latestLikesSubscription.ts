/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: latestLikesSubscription
// ====================================================

export interface latestLikesSubscription_latestLikes_post {
  __typename: "Post";
  id: string | null;
}

export interface latestLikesSubscription_latestLikes_user {
  __typename: "User";
  username: string | null;
}

export interface latestLikesSubscription_latestLikes {
  __typename: "Like";
  id: string | null;
  post: latestLikesSubscription_latestLikes_post | null;
  user: latestLikesSubscription_latestLikes_user | null;
}

export interface latestLikesSubscription {
  latestLikes: latestLikesSubscription_latestLikes | null;
}

export interface latestLikesSubscriptionVariables {
  latestLikesIds?: string[] | null;
}

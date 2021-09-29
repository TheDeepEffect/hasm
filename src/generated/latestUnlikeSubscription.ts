/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: latestUnlikeSubscription
// ====================================================

export interface latestUnlikeSubscription_latestUnlikes {
  __typename: "Like";
  id: string | null;
}

export interface latestUnlikeSubscription {
  latestUnlikes: latestUnlikeSubscription_latestUnlikes | null;
}

export interface latestUnlikeSubscriptionVariables {
  latestUnlikesIds?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnlikeMutation
// ====================================================

export interface UnlikeMutation_unlike {
  __typename: "Like";
  id: string | null;
}

export interface UnlikeMutation {
  unlike: UnlikeMutation_unlike | null;
}

export interface UnlikeMutationVariables {
  unlikeId: string;
}

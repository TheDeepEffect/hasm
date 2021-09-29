/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUser
// ====================================================

export interface currentUser_currentUser_posts {
  __typename: "Post";
  id: string | null;
  url: string | null;
  isPrivate: boolean | null;
  createdAt: any | null;
}

export interface currentUser_currentUser_followers_followByUser {
  __typename: "User";
  id: string | null;
  username: string | null;
}

export interface currentUser_currentUser_followers {
  __typename: "Follow";
  id: string | null;
  followByUser: currentUser_currentUser_followers_followByUser | null;
}

export interface currentUser_currentUser_following_followToUser {
  __typename: "User";
  id: string | null;
  username: string | null;
}

export interface currentUser_currentUser_following {
  __typename: "Follow";
  id: string | null;
  followToUser: currentUser_currentUser_following_followToUser | null;
}

export interface currentUser_currentUser {
  __typename: "User";
  name: string | null;
  email: string | null;
  username: string | null;
  profile_pic: string | null;
  posts: (currentUser_currentUser_posts | null)[] | null;
  followers: (currentUser_currentUser_followers | null)[] | null;
  following: (currentUser_currentUser_following | null)[] | null;
}

export interface currentUser {
  currentUser: currentUser_currentUser | null;
}

export interface currentUserVariables {
  currentUserUsername: string;
}

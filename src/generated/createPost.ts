/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createPost_author {
    __typename: 'User'
    username: string | null
    profile_pic: string | null
}

export interface createPost_createPost_likes_user {
    __typename: 'User'
    username: string | null
}

export interface createPost_createPost_likes {
    __typename: 'Like'
    user: createPost_createPost_likes_user | null
}

export interface createPost_createPost_comments_user {
    __typename: 'User'
    username: string | null
}

export interface createPost_createPost_comments {
    __typename: 'Comment'
    content: string | null
    user: createPost_createPost_comments_user | null
}

export interface createPost_createPost {
    __typename: 'Post'
    id: string | null
    url: string | null
    description: string | null
    isPrivate: boolean | null
    author: createPost_createPost_author | null
    likes: (createPost_createPost_likes | null)[] | null
    comments: (createPost_createPost_comments | null)[] | null
}

export interface createPost {
    createPost: createPost_createPost | null
}

export interface createPostVariables {
    createPostUrl: string
    createPostIsPrivate?: boolean | null
    createPostDescription?: string | null
}

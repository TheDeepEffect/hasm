/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Feed
// ====================================================

export interface Feed_feed_author {
    __typename: 'User'
    username: string | null
    profile_pic: string | null
}

export interface Feed_feed_likes_user {
    __typename: 'User'
    username: string | null
}

export interface Feed_feed_likes {
    __typename: 'Like'
    user: Feed_feed_likes_user | null
}

export interface Feed_feed_comments_user {
    __typename: 'User'
    username: string | null
}

export interface Feed_feed_comments {
    __typename: 'Comment'
    content: string | null
    user: Feed_feed_comments_user | null
}

export interface Feed_feed {
    __typename: 'Post'
    id: string | null
    url: string | null
    description: string | null
    isPrivate: boolean | null
    author: Feed_feed_author | null
    likes: (Feed_feed_likes | null)[] | null
    comments: (Feed_feed_comments | null)[] | null
}

export interface Feed {
    feed: (Feed_feed | null)[] | null
}

export interface FeedVariables {
    feedSkip?: number | null
    feedTake?: number | null
}

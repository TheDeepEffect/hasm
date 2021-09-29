import gql from 'graphql-tag';

export const LATEST_POST = gql`
    subscription Subscription {
        latestPost {
            id
            url
            description
            isPrivate
            createdAt
            author {
                username
                profile_pic
            }
            likes {
                id
                user {
                    username
                }
            }
            comments {
                id
                content
                user {
                    username
                }
            }
        }
    }
`;
export const LATEST_LIKE = gql`
    subscription latestLikesSubscription($latestLikesIds: [String!]) {
        latestLikes(ids: $latestLikesIds) {
            id
            post {
                id
            }
            user {
                username
            }
        }
    }
`;

export const LATEST_UNLIKE = gql`
    subscription latestUnlikeSubscription($latestUnlikesIds: [String!]) {
        latestUnlikes(ids: $latestUnlikesIds) {
            id
        }
    }
`;

export const LATEST_COMMENTS = gql`
    subscription latestComments($latestCommentIds: [String!]) {
        latestComment(ids: $latestCommentIds) {
            id
            content
            user {
                username
            }
            post {
                id
            }
        }
    }
`;

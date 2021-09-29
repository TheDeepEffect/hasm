import gql from 'graphql-tag';

export const FEED = gql`
    query Feed($feedSkip: Int, $feedTake: Int) {
        feed(skip: $feedSkip, take: $feedTake) {
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

export const CURRENT_USER = gql`
    query currentUser($currentUserUsername: String!) {
        currentUser(username: $currentUserUsername) {
            name
            email
            username
            profile_pic
            posts {
                id
                url
                isPrivate
                createdAt
            }
            followers {
                id
                followByUser {
                    id
                    username
                }
            }
            following {
                id
                followToUser {
                    id
                    username
                }
            }
        }
    }
`;

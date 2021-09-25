import gql from 'graphql-tag'

export const FEED = gql`
    query Feed($feedSkip: Int, $feedTake: Int) {
        feed(skip: $feedSkip, take: $feedTake) {
            id
            url
            description
            isPrivate
            author {
                username
                profile_pic
            }
            likes {
                user {
                    username
                }
            }
            comments {
                content
                user {
                    username
                }
            }
        }
    }
`

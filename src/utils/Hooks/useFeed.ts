import { useApolloClient, useQuery } from '@apollo/client'
import { FEED } from './../resolvers/queries'
import { Feed, FeedVariables } from './../../generated/Feed'
import { parseFeed } from '../helpers'

export const useFeed = () => {
    const client = useApolloClient()
    const onCompleted = async (data: Feed) => {
        const newFeed = await parseFeed(data)
        client.writeQuery({
            query: FEED,
            data: {
                feed: [...newFeed],
            },
        })
    }

    const { data, loading, fetchMore } = useQuery<Feed, FeedVariables>(FEED, {
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        variables: { feedSkip: 0, feedTake: 5 },
        onCompleted: onCompleted,
    })

    return { data, loading, fetchMore }
}

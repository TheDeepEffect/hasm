import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { FEED } from './../resolvers/queries';
import { Feed, FeedVariables, Feed_feed } from './../../generated/Feed';
import { parseFeed } from '../helpers';
import {
    LATEST_COMMENTS,
    LATEST_LIKE,
    LATEST_POST,
    LATEST_UNLIKE,
} from '../resolvers/subscriptions';
import { useCallback, useEffect, useMemo } from 'react';
import { useStore } from './useStore';
import { useAuth } from './useAuth';
import {
    latestUnlikeSubscription,
    latestUnlikeSubscriptionVariables,
} from '../../generated/latestUnlikeSubscription';
import {
    latestLikesSubscription,
    latestLikesSubscriptionVariables,
} from '../../generated/latestLikesSubscription';
import { LikeMutation } from '../../generated/LikeMutation';
import {
    latestComments,
    latestCommentsVariables,
} from '../../generated/latestComments';
import { addComment_addComment } from '../../generated/addComment';

export const useFeed = () => {
    const client = useApolloClient();
    const { state, setCurrentPost, setNewPost, resetNewPost } = useStore();
    const { currentUser } = useAuth();
    const { newPosts } = state;
    const onCompleted = async (data: Feed) => {
        const newFeed = await parseFeed(data);
        client.writeQuery({
            query: FEED,
            data: {
                feed: [...newFeed],
            },
        });
    };

    const {
        data,
        loading,
        fetchMore,
        subscribeToMore = () => () => {},
    } = useQuery<Feed, FeedVariables>(FEED, {
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        variables: { feedSkip: 0, feedTake: 5 },
        onCompleted,
    });

    useEffect(() => {
        const unsubscribe = subscribeToMore<{ latestPost: Feed_feed | null }>({
            document: LATEST_POST,
            // @ts-ignore
            updateQuery: (prev, { subscriptionData }) => {
                if (subscriptionData.data.latestPost) {
                    const newPosts = subscriptionData.data.latestPost;
                    if (
                        subscriptionData.data.latestPost.author?.username !==
                        currentUser?.user?.username
                    ) {
                        // @ts-ignore
                        setNewPost((state) => [{ ...newPosts }, ...state]);
                    }
                }
                return prev;
            },
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const isNewPostAvailable = useMemo(() => {
        return newPosts.length ? true : false;
    }, [newPosts]);

    const loadNewPosts = useCallback(async () => {
        if (newPosts.length) {
            const currentPosts =
                client.readQuery<Feed>({
                    query: FEED,
                })?.feed || [];
            const newPostss = await parseFeed({ feed: newPosts });
            client.writeQuery({
                query: FEED,
                data: {
                    feed: [...newPostss, ...currentPosts],
                },
            });
            resetNewPost();
            setCurrentPost(0);
        }
    }, [newPosts]);

    const feedPostIds = useMemo(() => {
        return data?.feed?.map((post) => post?.id || '').filter((x) => x);
    }, [data]);

    useSubscription<latestLikesSubscription, latestLikesSubscriptionVariables>(
        LATEST_LIKE,
        {
            variables: {
                latestLikesIds: feedPostIds,
            },
            onSubscriptionData: ({ client, subscriptionData }) => {
                if (subscriptionData.data?.latestLikes) {
                    const { id, user } = subscriptionData.data.latestLikes;
                    const existingPosts = client.readQuery<Feed>({
                        query: FEED,
                    });
                    const newLike: LikeMutation = {
                        like: {
                            __typename: 'Like',

                            id,
                            user,
                        },
                    };

                    const newPosts = existingPosts?.feed?.map((post) => {
                        if (
                            subscriptionData.data?.latestLikes?.post?.id ===
                            post?.id
                        ) {
                            const existingLikes = post?.likes || [];
                            const newLikes = [
                                { ...newLike.like },
                                ...existingLikes,
                            ];
                            return {
                                ...post,
                                likes: newLikes,
                            };
                        }
                        return post;
                    });
                    client.writeQuery({
                        query: FEED,
                        data: { feed: newPosts },
                    });
                }
            },
        }
    );

    useSubscription<
        latestUnlikeSubscription,
        latestUnlikeSubscriptionVariables
    >(LATEST_UNLIKE, {
        variables: {
            latestUnlikesIds: feedPostIds,
        },
        onSubscriptionData: ({ client, subscriptionData }) => {
            if (subscriptionData.data?.latestUnlikes) {
                const existingPosts = client.readQuery<Feed>({
                    query: FEED,
                });
                const newPosts = existingPosts?.feed?.map((post) => {
                    if (
                        post?.likes?.some(
                            (like) =>
                                like?.id ===
                                subscriptionData.data?.latestUnlikes?.id
                        )
                    ) {
                        const newLikes =
                            post?.likes?.filter((like) => {
                                if (
                                    like?.id !==
                                    subscriptionData.data?.latestUnlikes?.id
                                ) {
                                    return true;
                                }
                                return false;
                            }) || [];

                        return {
                            ...post,
                            likes: newLikes,
                        };
                    }
                    return post;
                });
                client.writeQuery({
                    query: FEED,
                    data: { feed: newPosts },
                });
            }
        },
    });

    useSubscription<latestComments, latestCommentsVariables>(LATEST_COMMENTS, {
        variables: {
            latestCommentIds: feedPostIds,
        },
        onSubscriptionData: ({ client, subscriptionData }) => {
            if (subscriptionData.data?.latestComment) {
                const { id, content, user, __typename, post } =
                    subscriptionData.data.latestComment;
                const existingPosts = client.readQuery<Feed>({
                    query: FEED,
                });
                const newComment: addComment_addComment = {
                    __typename,
                    id,
                    content,
                    user,
                };
                const newPosts = existingPosts?.feed?.map((item) => {
                    if (post?.id === item?.id) {
                        const existingComments = item?.comments || [];
                        const newComments = [
                            { ...newComment },
                            ...existingComments,
                        ];
                        return {
                            ...item,
                            comments: newComments,
                        };
                    }
                    return item;
                });
                client.writeQuery({
                    query: FEED,
                    data: { feed: newPosts },
                });
            }
        },
    });

    return {
        data,
        loading,
        fetchMore,
        isNewPostAvailable,
        loadNewPosts,
    };
};

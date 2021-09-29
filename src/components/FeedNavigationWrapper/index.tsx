import { createContext, useMemo } from 'react';
import { Feed, Feed_feed } from '../../generated/Feed';
import { IFeedNavigationWrapperProps } from '../../types';
import { useFeed } from '../../utils/hooks/useFeed';
import { useStore } from '../../utils/hooks/useStore';
import './style.css';

export const FeedContext = createContext<{
    data: Feed | undefined;
    loading: boolean;
    isNewPostAvailable: boolean;
    loadNewPosts: () => void;
    post: Feed_feed | null;
} | null>(null);

export const FeedNavigationWrapper = (props: IFeedNavigationWrapperProps) => {
    const { data, loading, fetchMore, isNewPostAvailable, loadNewPosts } =
        useFeed();
    const {
        state: { currentPost },
        setCurrentPost,
    } = useStore();

    const handleOnPreviousClick = () => {
        if (currentPost !== 0) {
            setCurrentPost(currentPost - 1);
        }
    };

    const handleOnNextClick = () => {
        if (data?.feed?.length && currentPost + 1 === data?.feed.length) {
            if (fetchMore) {
                fetchMore({
                    variables: { feedSkip: currentPost + 1, feedTake: 5 },
                }).then(({ data }) => {
                    if (data?.feed?.length !== currentPost + 1) {
                        setCurrentPost(currentPost + 1);
                    }
                });
            }
        } else {
            setCurrentPost(currentPost + 1);
        }
    };

    const post = useMemo(() => {
        return data?.feed?.[currentPost];
    }, [data, currentPost]);

    const { children } = props;
    return (
        <FeedContext.Provider
            value={{
                data,
                loading,
                isNewPostAvailable,
                loadNewPosts,
                post: post || null,
            }}
        >
            <div className="next-hover">
                <div className="nav-button next" onClick={handleOnNextClick}>
                    {/* {loading ? <Spinner /> : `>`} */}
                    &gt;
                </div>
            </div>
            {children}
            <div className=" previous-hover">
                <div
                    className="nav-button previous"
                    onClick={handleOnPreviousClick}
                >
                    &lt;
                </div>
            </div>
        </FeedContext.Provider>
    );
};

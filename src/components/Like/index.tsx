import { useMemo } from 'react';
import { GiPunch } from 'react-icons/gi';
import { ILikeProps } from '../../types';
import { useAuth } from '../../utils/hooks/useAuth';
import { useLike } from '../../utils/hooks/useLike';

export const Like = (props: ILikeProps) => {
    const { loading, post } = props;
    const { currentUser } = useAuth();
    const isLiked = useMemo(() => {
        return post?.likes?.some(
            (like) => like?.user?.username === currentUser?.user?.username
        );
    }, [post, currentUser]);
    const { loading: likeLoading, onLike, onUnlike, unlikeLoading } = useLike();

    const handleOnLikeClick = () => {
        if (isLiked) {
            onUnlike({
                variables: {
                    unlikeId:
                        post?.likes?.find(
                            (like) =>
                                like?.user?.username ===
                                currentUser?.user?.username
                        )?.id || '',
                },
            });
        } else {
            onLike({ variables: { likePostId: post?.id || '' } });
        }
    };
    return (
        <button
            disabled={loading || likeLoading || unlikeLoading}
            className={`flex items-center ${
                isLiked ? 'text-yellow-400' : 'text-white'
            }`}
            onClick={handleOnLikeClick}
        >
            <GiPunch size={32} />
            <span className="m-2">
                {post?.likes?.length ? post.likes.length : 0}
            </span>
        </button>
    );
};

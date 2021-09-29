import { useMemo, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useFeedNavigation } from '../../utils/hooks/useFeedNavigation';
import { useStore } from '../../utils/hooks/useStore';
import { AddPostButton } from '../AddPostButton';
import { Comments } from '../Comments';
import { Like } from '../Like';
import { Username } from '../Username';

export const FeedButtomActivityBar = () => {
    const { state } = useStore();
    const {
        bottomActivityBar: { visible },
    } = state;
    const [isShowComments, setIsShowComments] = useState(false);

    const { post, loading } = useFeedNavigation();

    return (
        <>
            <div
                className={`${
                    visible ? 'flex' : 'hidden'
                } flex-col items-center  md:flex-row  justify-between  bg-gray-900 w-full bg-opacity-50 p-3`}
            >
                <div className="flex w-full  md:w-1/12 justify-around">
                    <Like loading={loading} post={post || null} />
                    <AddPostButton className="block  md:hidden" />
                    <button
                        onClick={() => setIsShowComments((state) => !state)}
                        className={`${isShowComments ? 'text-yellow-400' : ''}`}
                    >
                        <FaRegComment size={30} />
                    </button>
                </div>
                <AddPostButton className="hidden md:block" />
                <Link to={`/${post?.author?.username}`}>
                    <Username
                        profile_pic={post?.author?.profile_pic || ''}
                        username={
                            loading ? 'Loading..' : post?.author?.username || ''
                        }
                    />
                </Link>
            </div>
            <Comments isVisible={isShowComments && visible} />
        </>
    );
};

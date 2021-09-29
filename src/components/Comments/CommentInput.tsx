import { useState } from 'react';
import { useAuth } from '../../utils/hooks/useAuth';
import { useComment } from '../../utils/hooks/useComment';
import { useFeedNavigation } from '../../utils/hooks/useFeedNavigation';

import { Input } from '../Input';

export const CommentInput = () => {
    const { post } = useFeedNavigation();
    const { currentUser } = useAuth();
    const [comment, setComment] = useState('');
    const onCompleted = () => {
        setComment('');
    };
    const { addComment, loading } = useComment({ onCompleted });
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment.trim()) {
            addComment({
                variables: {
                    addCommentPostId: post?.id || '',
                    addCommentContent: comment,
                },
            });
        }
    };

    return (
        <form
            className="flex h-12 items-center justify-around"
            onSubmit={handleOnSubmit}
        >
            <img
                className={`${
                    currentUser?.user?.profile_pic ? '' : 'hidden'
                } rounded-full float-left h-10 w-10 mr-2`}
                src={currentUser?.user?.profile_pic || ''}
                alt={currentUser?.user?.username || ''}
            />
            <Input
                type="text"
                placeholder="Add a comment.."
                className="rounded-md  p-3  h-2/3  w-10/12 md:w-11/12  placeholder-white focus:outline-none focus:ring focus:border-blue-600 bg-transparent"
                disabled={loading || !post?.id}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            />
        </form>
    );
};

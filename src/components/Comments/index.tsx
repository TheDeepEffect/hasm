import { useFeedNavigation } from '../../utils/hooks/useFeedNavigation';
import { CommentInput } from './CommentInput';
import { SingleComment } from './SingleComment';

export const Comments = ({ isVisible }: { isVisible: boolean }) => {
    const { post } = useFeedNavigation();
    return (
        <>
            <div
                className={`${
                    isVisible ? 'flex' : 'hidden'
                } flex-col h-96   bg-gray-800 bg-opacity-50 backdrop-filter  backdrop-blur-md  w-full  z-20 p-3 overflow-y-auto`}
            >
                <div className="flex justify-center items-center w-full mb-2">
                    <article className="text-justify max-w-prose">
                        {post?.description ? post.description : ''}
                    </article>
                </div>
                <CommentInput />
                {post?.comments?.map((comment) => {
                    return (
                        <SingleComment key={comment?.id} comment={comment} />
                    );
                })}
            </div>
        </>
    );
};

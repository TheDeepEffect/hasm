import { Feed_feed_comments } from '../../generated/Feed';

type ISingleCommentProps = {
    comment: Feed_feed_comments | null;
};
export const SingleComment = (props: ISingleCommentProps) => {
    const { comment } = props;
    return (
        <div className="flex w-full min-h-10 items-center justify-around my-2">
            <span className="font-bold self-baseline mr-2">
                {comment?.user?.username}
            </span>
            <article className="w-10/12 md:w-11/12 h-full">
                {comment?.content}
            </article>
        </div>
    );
};

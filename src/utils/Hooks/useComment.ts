import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../resolvers/mutations';
import { addComment, addCommentVariables } from '../../generated/addComment';

type IUseCommentProps = {
    onCompleted: () => void;
};
export const useComment = ({ onCompleted }: IUseCommentProps) => {
    const [addComment, { loading }] = useMutation<
        addComment,
        addCommentVariables
    >(ADD_COMMENT, {
        onCompleted,
    });

    return { addComment, loading };
};

import { useMutation } from '@apollo/client';
import { LIKE, UNLIKE } from '../resolvers/mutations';
import {
    UnlikeMutation,
    UnlikeMutationVariables,
} from '../../generated/UnlikeMutation';
import {
    LikeMutation,
    LikeMutationVariables,
} from './../../generated/LikeMutation';

export const useLike = () => {
    const [onLike, { loading }] = useMutation<
        LikeMutation,
        LikeMutationVariables
    >(LIKE);

    const [onUnlike, { loading: unlikeLoading }] = useMutation<
        UnlikeMutation,
        UnlikeMutationVariables
    >(UNLIKE);
    return { onLike, loading, unlikeLoading, onUnlike };
};

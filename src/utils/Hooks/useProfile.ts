import { useApolloClient, useLazyQuery } from '@apollo/client';
import { parseProfile } from '../helpers';
import { CURRENT_USER } from '../resolvers/queries';
import {
    currentUser,
    currentUserVariables,
} from './../../generated/currentUser';

export const useProfile = () => {
    const client = useApolloClient();
    const onCompleted = async (data: currentUser) => {
        const newProfile = await parseProfile(data);
        client.writeQuery<currentUser, currentUserVariables>({
            query: CURRENT_USER,
            data: {
                currentUser: newProfile,
            },
        });
    };
    const [loadCurrentUser, { data, loading, error }] = useLazyQuery<
        currentUser,
        currentUserVariables
    >(CURRENT_USER, {
        onCompleted,
    });

    return {
        loadUser: loadCurrentUser,
        data,
        loading,
        error,
    };
};

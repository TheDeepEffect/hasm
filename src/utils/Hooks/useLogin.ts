import { useMutation } from '@apollo/client';
import { login, loginVariables } from '../../generated/login';
import { IUseLoginProps } from '../../types';
import { fetchImage } from '../helpers';
import { LOG_IN } from '../resolvers/mutations';
import { useAuth } from './useAuth';

// TODO: Fetch image and save in currentUser
export const useLogin = (props: IUseLoginProps = {}) => {
    const { onCompleted = () => {} } = props;
    const { setCurrentUser } = useAuth();
    const [login, { loading, error, data }] = useMutation<
        login,
        loginVariables
    >(LOG_IN, {
        onCompleted: async (data: login) => {
            if (data?.login?.__typename === 'AuthPayload' && data.login.user) {
                let profile_pic = null;
                if (data.login.user?.profile_pic) {
                    const newImage = await fetchImage(
                        data.login.user.profile_pic
                    );
                    profile_pic = newImage || '';
                }
                setCurrentUser({
                    expiresAt: data.login.expiresAt || '',
                    user: {
                        ...data.login.user,
                        profile_pic,
                    },
                });
                onCompleted();
            } else {
                setCurrentUser({
                    expiresAt: '',
                    user: null,
                });
            }
        },
    });
    return { login, loading, error, data };
};

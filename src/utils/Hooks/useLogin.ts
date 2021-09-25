import { useMutation } from '@apollo/client'
import { login, loginVariables } from '../../generated/login'
import { IUseLoginProps } from '../../types'
import { LOG_IN } from '../resolvers/mutations'
import { useAuth } from './useAuth'

export const useLogin = (props: IUseLoginProps = {}) => {
    const { onCompleted = () => {} } = props
    const { setCurrentUser } = useAuth()
    const [login, { loading, error, data }] = useMutation<
        login,
        loginVariables
    >(LOG_IN, {
        onCompleted: (data: login) => {
            if (data?.login?.__typename === 'AuthPayload') {
                setCurrentUser({
                    expiresAt: data.login.expiresAt || '',
                    user: data.login.user,
                })
                onCompleted()
            } else {
                setCurrentUser({
                    expiresAt: '',
                    user: null,
                })
            }
        },
    })
    return { login, loading, error, data }
}

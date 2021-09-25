import { useParams } from 'react-router'
import { IUsernameProps } from '../../types'
import { useAuth } from '../../utils/hooks/useAuth'

export const Username = (props: IUsernameProps) => {
    const { username } = useParams<{ username: string }>()
    const { currentUser } = useAuth()
    const profile_pic =
        currentUser?.user?.username === username
            ? currentUser.user.profile_pic
            : props.profile_pic
    return (
        <div className="flex h-14 sm:w-3/6 lg:w-full items-center justify-between">
            <img
                className={`${
                    profile_pic ? '' : 'hidden'
                } rounded-full float-left h-14 w-14`}
                src={profile_pic || ''}
                alt={username || ''}
            />
            <span className="text-white ml-2  whitespace-nowrap overflow-x-hidden overflow-ellipsis">
                {username ? username : props?.username}
            </span>
        </div>
    )
}

import { useParams } from 'react-router';
import { IUsernameProps } from '../../types';

export const Username = (props: IUsernameProps) => {
    const { username } = useParams<{ username: string }>();
    return (
        <div className="flex h-14 sm:w-3/6 lg:w-full items-center justify-between">
            <img
                className={`${
                    props.profile_pic ? '' : 'hidden'
                } rounded-full float-left h-14 w-14`}
                src={props.profile_pic}
                alt={props?.username ? props?.username : username}
            />
            <span className="text-white ml-2  whitespace-nowrap overflow-x-hidden overflow-ellipsis">
                {props?.username ? props?.username : username}
            </span>
        </div>
    );
};

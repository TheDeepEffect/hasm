import { IPost } from '../../types';

export const Post = ({ image_url }: IPost) => {
    return (
        <div className="flex justify-center items-center">
            <img
                className={
                    image_url
                        ? 'max-h-screen max-w-screen h-full  w-5/6 shadow-2xl object-contain'
                        : 'hidden'
                }
                alt=""
                src={image_url || ''}
            />
        </div>
    );
};

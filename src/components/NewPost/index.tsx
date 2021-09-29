import { INewPostProps } from '../../types';

export const NewPost = (props: INewPostProps) => {
    const { loadNewPosts } = props;
    return (
        <div className="fixed flex ml-3 w-full h-1/6 place-items-end justify-center">
            <div
                className="bg-red-500 p-3 rounded-full cursor-pointer z-50 flex items-center justify-center"
                onClick={loadNewPosts}
            >
                New Posts
            </div>
        </div>
    );
};

import {
    currentUser,
    currentUser_currentUser,
    currentUser_currentUser_posts,
} from '../generated/currentUser';
import { Feed, Feed_feed } from '../generated/Feed';
import { IChunkProps } from '../types';
import { GET } from './HttpServices';

export const chunk = ({ arr, size }: IChunkProps) => {
    const maxSizeOfSubArray = Math.ceil(arr.length / size);
    return Array.from({ length: size }, (v, i) => {
        return arr.slice(
            i * maxSizeOfSubArray,
            i * maxSizeOfSubArray + maxSizeOfSubArray
        );
    });
};

export const getRandomColor = (): string => {
    const colors = [
        'red',
        'yellow',
        'green',
        'blue',
        'indigo',
        'purple',
        'pink',
    ];
    const randomNumber = Math.floor(Math.random() * 7);
    return colors[randomNumber];
};

export const setLocalStorage = (key: string, value: any) => {
    window.localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
    const value = window.localStorage.getItem(key) || '';
    if (value) {
        return JSON.parse(value);
    }
    return false;
};

export const fetchImage = async (publicId: string) => {
    try {
        if (publicId.startsWith('blob')) {
            return publicId;
        } else {
            const url = `${process?.env?.REACT_APP_CLOUDINARY_BASE_URL}${process?.env?.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
            const res = await GET({ url });
            const data = await res.blob();
            const image = URL.createObjectURL(data);

            return image;
        }
    } catch (err) {
        console.log({ err });
        throw new Error('Failed to get Image');
    }
};

export const parseSinglePost = async (item: Feed_feed | null) => {
    if (!item?.url?.startsWith('blob')) {
        let postImage, profilePic;
        if (item?.url) {
            postImage = await fetchImage(item.url);
        }
        if (item?.author?.profile_pic) {
            profilePic = await fetchImage(item.author.profile_pic);
        }
        return {
            ...item,
            url: postImage,
            author: {
                ...item?.author,
                profile_pic: profilePic || '',
            },
        };
    } else {
        return item;
    }
};

export const parseFeed = async (data: Feed) => {
    const newFeedPromise = data?.feed?.map(async (item) => {
        const data = await parseSinglePost(item);
        return data;
    });
    // @ts-ignore
    const newFeed = await Promise.all<Feed>(newFeedPromise);
    return newFeed;
};

export const parseProfile = async (
    data: currentUser
): Promise<currentUser_currentUser> => {
    let profile_pic, posts;
    const user = data.currentUser;
    if (user?.profile_pic) {
        profile_pic = await fetchImage(user.profile_pic);
    }
    if (user?.posts?.length) {
        const newPostPromises = user.posts.map(async (item) => {
            let url;
            if (item?.url) {
                url = await fetchImage(item.url);
            }
            return { ...item, url: url || '' };
        });
        // @ts-ignore
        const newPosts: (currentUser_currentUser_posts | null)[] =
            await Promise.all([...newPostPromises]);
        posts = newPosts;
    }
    // @ts-ignore
    return { ...user, profile_pic: profile_pic || '', posts: posts || [] };
};

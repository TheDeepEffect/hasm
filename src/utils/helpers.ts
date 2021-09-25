import { Feed } from '../generated/Feed'
import { IChunkProps } from '../types'
import { GET } from './HttpServices'

export const chunk = ({ arr, size }: IChunkProps): string[][] => {
    const maxSizeOfSubArray = Math.ceil(arr.length / size)
    return Array.from({ length: size }, (v, i) => {
        return arr.slice(
            i * maxSizeOfSubArray,
            i * maxSizeOfSubArray + maxSizeOfSubArray
        )
    })
}

export const getRandomColor = (): string => {
    const colors = [
        'red',
        'yellow',
        'green',
        'blue',
        'indigo',
        'purple',
        'pink',
    ]
    const randomNumber = Math.floor(Math.random() * 7)
    return colors[randomNumber]
}

export const setLocalStorage = (key: string, value: any) => {
    window.localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
    const value = window.localStorage.getItem(key) || ''
    if (value) {
        return JSON.parse(value)
    }
    return false
}

export const fetchImage = async (publicId: string) => {
    try {
        const url = `${process?.env?.REACT_APP_CLOUDINARY_BASE_URL}${process?.env?.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`
        const res = await GET({ url })
        const data = await res.blob()
        const image = URL.createObjectURL(data)

        return image
    } catch (err) {
        console.log({ err })
        throw new Error('Failed to get Image')
    }
}

export const parseFeed = async (data: Feed) => {
    const newFeedPromise = data?.feed?.map(async (item) => {
        if (!item?.url?.startsWith('blob')) {
            let postImage, profilePic
            if (item?.url) {
                postImage = await fetchImage(item.url)
            }
            if (item?.author?.profile_pic) {
                profilePic = await fetchImage(item.author.profile_pic)
            }
            return {
                ...item,
                url: postImage,
                author: {
                    ...item?.author,
                    profile_pic: profilePic || '',
                },
            }
        } else {
            return item
        }
    })
    // @ts-ignore
    const newFeed = await Promise.all<Feed>(newFeedPromise)
    return newFeed
}

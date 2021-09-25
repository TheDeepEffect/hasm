import { usePalette } from 'react-palette'
import { IFeedItem } from '../../types'
import { Post } from '../Post'

export const FeedItem = (props: IFeedItem) => {
    const { image_url } = props
    const { data } = usePalette(image_url)
    return (
        <div
            className="h-screen w-sreen flex justify-center items-center"
            style={{
                background: `linear-gradient(180deg,${data.vibrant},transparent)`,
            }}
        >
            <Post image_url={image_url} />
        </div>
    )
}

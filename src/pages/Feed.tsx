import { FeedNavigationWrapper } from '../components/FeedNavigationWrapper'
import { FeedWrapper } from '../components/FeedWrapper'

const Feed = () => {
    return (
        <div className="bg-black text-white max-h-screen overflow-y-auto">
            <FeedNavigationWrapper>
                <FeedWrapper />
            </FeedNavigationWrapper>
        </div>
    )
}
export default Feed

import { BottomActivityBar } from "../components/BottomActivityBar"
import { FeedItem } from "../components/FeedItem"
import { FeedNavigationWrapper } from "../components/FeedNavigationWrapper"
import { Navbar } from "../components/Navbar"

const Feed = () => {

    const images = ["https://s3-eu-west-1.amazonaws.com/images.smoolis.com/252c5d87-51d6-467f-afad-6571aa531813/large/best-black-lights.jpeg",
        "https://m.media-amazon.com/images/M/MV5BMjcxMDg4MDUtMmQ2NC00ZDIyLTkyMjEtMDBiY2NiOTA2NWVmXkEyXkFqcGdeQWpybA@@._V1_QL75_UY281_CR2,0,500,281_.jpg",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWF8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    ]
    return <div className="bg-black text-white max-h-screen">
        <FeedNavigationWrapper>
            <Navbar />
            <FeedItem
                image_url={images[2]}
            />
            <BottomActivityBar />
        </FeedNavigationWrapper>
    </div>
}
export default Feed;
import { FaUserAstronaut } from 'react-icons/fa'
import { useAuth } from '../../utils/hooks/useAuth'
import { useFeedNavigation } from '../../utils/hooks/useFeedNavigation'
import { useStore } from '../../utils/hooks/useStore'
import { BottomActivityBar } from '../BottomActivityBar'
import { FeedItem } from '../FeedItem'
import { Logo } from '../Logo'
import { Navbar, NavItem } from '../Navbar'

export const FeedWrapper = () => {
    const { currentUser } = useAuth()
    const {
        state: { currentPost },
    } = useStore()
    const { data } = useFeedNavigation()
    return (
        <>
            <Navbar>
                <NavItem to="/">
                    <Logo />
                </NavItem>
                <NavItem to={`/${currentUser?.user?.username}`}>
                    <FaUserAstronaut size={32} />
                </NavItem>
            </Navbar>
            <FeedItem image_url={data?.feed?.[currentPost]?.url || ''} />
            <BottomActivityBar />
        </>
    )
}

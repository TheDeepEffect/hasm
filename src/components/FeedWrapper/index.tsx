import { FaUserAstronaut } from 'react-icons/fa';
import { useAuth } from '../../utils/hooks/useAuth';
import { useFeedNavigation } from '../../utils/hooks/useFeedNavigation';
import { BottomActivityBar } from '../BottomActivityBar';
import { FeedItem } from '../FeedItem';
import { Logo } from '../Logo';
import { Navbar, NavItem } from '../Navbar';
import { NewPost } from '../NewPost';

export const FeedWrapper = () => {
    const { currentUser } = useAuth();
    const { isNewPostAvailable, loadNewPosts, post } = useFeedNavigation();
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
            {isNewPostAvailable ? <NewPost loadNewPosts={loadNewPosts} /> : ''}
            <FeedItem image_url={post?.url || ''} />
            <BottomActivityBar />
        </>
    );
};

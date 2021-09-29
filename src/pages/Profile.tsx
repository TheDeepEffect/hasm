import { useEffect } from 'react';
import { useParams } from 'react-router';
import { BottomActivityBar } from '../components/BottomActivityBar';
import { EditProfile } from '../components/EditProfile';
import { Logo } from '../components/Logo';
import { Navbar, NavItem } from '../components/Navbar';
import { ProfileGrid } from '../components/ProfileGrid';
import { Username } from '../components/Username';
import { chunk } from '../utils/helpers';
import { useProfile } from '../utils/hooks/useProfile';

const Profile = () => {
    const { username } = useParams<{ username: string }>();
    const { loadUser, data, loading } = useProfile();
    useEffect(() => {
        if (username) {
            loadUser({
                variables: {
                    currentUserUsername: username,
                },
            });
        }
    }, []);
    const columns = chunk({
        arr: data?.currentUser?.posts || [],
        size: 2,
    });
    return (
        <div className="text-white w-screen h-screen overflow-y-auto overflow-x-hidden">
            <EditProfile />
            <Navbar>
                <NavItem to="/">
                    <Logo />
                </NavItem>
                <NavItem to={`/${username}`}>
                    <Username
                        profile_pic={data?.currentUser?.profile_pic || ''}
                    />
                </NavItem>
            </Navbar>
            {loading ? 'Loading...' : <ProfileGrid columns={columns} />}
            <BottomActivityBar />
        </div>
    );
};

export default Profile;

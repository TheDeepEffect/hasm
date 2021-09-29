import { Route, RouteProps, Redirect } from 'react-router-dom';
import { AddPost } from '../components/AddPost';
import { useAuth } from '../utils/hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export const PrivateRoutes = (props: RouteProps) => {
    const { isAuthenticated, currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated()) {
            history.push('/login');
        }
    }, [currentUser, history, isAuthenticated]);
    if (!isAuthenticated()) {
        return <Redirect to="/login" />;
    }
    return (
        <>
            <AddPost />
            <Route {...props} />
        </>
    );
};

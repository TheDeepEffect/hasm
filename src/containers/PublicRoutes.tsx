import { Route, RouteProps, Redirect } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useAuth } from '../utils/hooks/useAuth';

export const PublicRoutes = (props: RouteProps) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated()) {
        return <Redirect to="/" />;
    }
    return (
        <div className="h-screen text-white flex flex-col items-center justify-center lg:p-20">
            <Logo />
            <div className="p-1 h-full w-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500">
                <div className="h-full w-full bg-black flex flex-col items-center justify-center">
                    <Route {...props} />
                </div>
            </div>
        </div>
    );
};

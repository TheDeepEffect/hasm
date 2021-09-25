import React from 'react'
import { routesConfig, IRoutesConfig } from './routesConfig'

const Feed = React.lazy(() => import('../pages/Feed'))
const LogIn = React.lazy(() => import('../pages/LogIn'))
const Profile = React.lazy(() => import('../pages/Profile'))
const SignUp = React.lazy(() => import('../pages/SignUp'))

export const routes: IRoutesConfig = {
    [routesConfig.login.id]: {
        ...routesConfig.login,
        component: LogIn,
    },
    [routesConfig.signup.id]: {
        ...routesConfig.signup,
        component: SignUp,
    },
    [routesConfig.feed.id]: {
        ...routesConfig.feed,
        component: Feed,
    },
    [routesConfig.post.id]: {
        ...routesConfig.post,
        component: Feed,
    },
    [routesConfig.profile.id]: {
        ...routesConfig.profile,
        component: Profile,
    },
}

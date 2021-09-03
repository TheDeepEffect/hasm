import { RouteComponentProps } from "react-router-dom";
export type IRoutesConfig = {
    [key: string]: {
        id: string;
        name: string;
        description?: string;
        path: string;
        path_string: (params: any) => string;
        exact: boolean;
        isPrivate: boolean;
        isStatic?: boolean;
        component?:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
    };
};

/**
 * @description the aim to create this config is to have
 *  a single source of truth for the routes defination.
 *  the reason we are not importing the components here
 *  for the property `component` is to avoid circular
 *  import dependencies error.
 *  components will be assigned in config/routes.ts
 */

export const routesConfig: IRoutesConfig = {
    login: {
        id: 'login',
        name: 'Log In',
        description: 'Log in page',
        path: '/login',
        path_string: () => {
            return `/login`;
        },
        exact: true,
        isPrivate: false,
        component: undefined
    },
    signup: {
        id: 'signup',
        name: 'Sign Up',
        description: 'Sign Up page',
        path: '/signup',
        path_string: () => {
            return `/signup`;
        },
        exact: true,
        isPrivate: false,
        component: undefined
    },
    feed: {
        id: 'feed',
        name: 'Feed',
        description: 'Feed page',
        path: '/',
        path_string: () => {
            return `/`;
        },
        exact: true,
        isPrivate: true,
        component: undefined
    },
    post: {
        id: 'post',
        name: 'Post',
        description: 'Single post page',
        path: '/post/:postId',
        path_string: ({ postId }) => {
            return `/post/${postId}`;
        },
        exact: true,
        isPrivate: true,
        component: undefined
    },
    profile: {
        id: "profile",
        name: 'Profile',
        description: 'User profile page',
        path: '/:username',
        path_string: ({ username }) => {
            return `/${username}`;
        },
        exact: true,
        isPrivate: true,
        component: undefined
    }
}
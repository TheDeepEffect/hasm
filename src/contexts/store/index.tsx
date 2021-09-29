import { createContext, useReducer } from 'react';
import {
    IStoreAction,
    IStoreDispatch,
    IStoreProps,
    IStoreState,
} from '../../types';
import { getLocalStorage, setLocalStorage } from '../../utils/helpers';

const initialNavbarState = getLocalStorage('navbar');
const initialBottomBarState = getLocalStorage('bottom-bar');
const initialState: IStoreState = {
    AddPost: {
        visible: false,
    },
    EditProfile: {
        visible: false,
    },
    navbar: {
        visible: initialNavbarState,
    },
    bottomActivityBar: {
        visible: initialBottomBarState,
    },
    currentPost: 0,
    newPosts: [],
};

const reducer = (state: IStoreState, action: IStoreAction) => {
    switch (action.type) {
        case 'TOGGLE_ADD_POST_DIALOGUE': {
            return {
                ...state,
                AddPost: {
                    ...state.AddPost,
                    visible: !state.AddPost.visible,
                },
            };
        }
        case 'TOGGLE_EDIT_PROFILE_DIALOGUE': {
            return {
                ...state,
                EditProfile: {
                    ...state.EditProfile,
                    visible: !state.EditProfile.visible,
                },
            };
        }
        case 'TOGGLE_NAVBAR': {
            setLocalStorage('navbar', !state.navbar.visible);
            return {
                ...state,
                navbar: {
                    ...state.navbar,
                    visible: !state.navbar.visible,
                },
            };
        }
        case 'TOGGLE_BOTTOM_ACTIVITY_BAR': {
            setLocalStorage('bottom-bar', !state.bottomActivityBar.visible);
            return {
                ...state,
                bottomActivityBar: {
                    ...state.bottomActivityBar,
                    visible: !state.bottomActivityBar.visible,
                },
            };
        }
        case 'SET_CURRENT_POST': {
            return {
                ...state,
                currentPost: action?.payload,
            };
        }
        case 'SET_NEW_POSTS': {
            return {
                ...state,
                newPosts: [{ ...action.payload }, ...state.newPosts],
            };
        }
        case 'RESET_NEW_POSTS': {
            return {
                ...state,
                newPosts: [],
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`);
        }
    }
};

export const Context = createContext<{
    state: IStoreState;
    dispatch: IStoreDispatch;
} | null>(null);

export const Store = (props: IStoreProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { children } = props;
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

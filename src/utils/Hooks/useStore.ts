import { useContext } from 'react';
import { Context } from '../../contexts/store';
import { Feed_feed } from '../../generated/Feed';

export const useStore = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useStore  must be used within a StoreProvider');
    } else {
        const { state, dispatch } = context;
        const setCurrentPost = (currentPost: number) => {
            dispatch({ type: 'SET_CURRENT_POST', payload: currentPost });
        };
        const toggleAddPost = () => {
            dispatch({ type: 'TOGGLE_ADD_POST_DIALOGUE' });
        };
        const toggleBottomActivityBar = () => {
            dispatch({ type: 'TOGGLE_BOTTOM_ACTIVITY_BAR' });
        };
        const toggleEditProfile = () => {
            dispatch({ type: 'TOGGLE_EDIT_PROFILE_DIALOGUE' });
        };
        const toggleNavbar = () => {
            dispatch({ type: 'TOGGLE_NAVBAR' });
        };

        const setNewPost = (data: Feed_feed) => {
            dispatch({
                type: 'SET_NEW_POSTS',
                payload: data,
            });
        };
        const resetNewPost = () => {
            dispatch({
                type: 'RESET_NEW_POSTS',
            });
        };

        return {
            state,
            setCurrentPost,
            toggleAddPost,
            toggleBottomActivityBar,
            toggleEditProfile,
            toggleNavbar,
            setNewPost,
            resetNewPost,
        };
    }
};

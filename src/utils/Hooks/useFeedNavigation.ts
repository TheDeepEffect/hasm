import { useContext } from 'react';
import { FeedContext } from '../../components/FeedNavigationWrapper';

export const useFeedNavigation = () => {
    const context = useContext(FeedContext);
    if (!context) {
        throw new Error(
            'useFeedNavigation can only be used in Children of FeedNavigationWrapper '
        );
    }
    return context;
};

import { useRouteMatch } from 'react-router-dom'
import { routesConfig } from '../../config/routesConfig'
import { useStore } from '../../utils/hooks/useStore'
import { ProfileBottomActivityBar } from './ProfileBottomActivityBar'
import { FeedButtomActivityBar } from './FeedBottomActivityBar'

export const BottomActivityBar = () => {
    const { path } = useRouteMatch()
    const { toggleBottomActivityBar } = useStore()

    const handleOnBottombarClick = () => {
        toggleBottomActivityBar()
    }

    if (path === routesConfig.profile.path) {
        return (
            <div className="flex flex-col absolute bottom-0  w-full z-20">
                <div
                    className="h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer"
                    onClick={handleOnBottombarClick}
                ></div>
                <ProfileBottomActivityBar />
            </div>
        )
    }
    return (
        <div className="flex flex-col absolute bottom-0  w-full z-20">
            <div
                className="h-2 w-full bg-gradient-to-r from-yellow-400  via-red-500 to-pink-500 cursor-pointer"
                onClick={handleOnBottombarClick}
            ></div>
            <FeedButtomActivityBar />
        </div>
    )
}

import { useStore } from '../../utils/hooks/useStore'
import { AddPostButton } from '../AddPostButton'
import { Button } from '../Button'

export const ProfileBottomActivityBar = () => {
    const { state, toggleEditProfile } = useStore()
    const {
        bottomActivityBar: { visible },
    } = state
    const handleOnEditProfileClick = () => {
        toggleEditProfile()
    }
    return (
        <div
            className={`${
                visible ? 'flex' : 'hidden'
            } flex-col items-center  md:flex-row  justify-between  bg-gray-900 w-full bg-opacity-50 p-3`}
        >
            <div className="flex flex-col items-center justify-center mb-2">
                Following
                <span>700</span>
            </div>
            <AddPostButton />
            <div className="flex flex-col items-center justify-center mb-2">
                Followers
                <span>400</span>
            </div>
            <div className="w-full md:w-1/4 text-center">
                <Button onClick={handleOnEditProfileClick}>Edit Profile</Button>
            </div>
        </div>
    )
}

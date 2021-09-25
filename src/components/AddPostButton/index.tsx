import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IAddPostButtonProps } from '../../types'
import { useStore } from '../../utils/hooks/useStore'

export const AddPostButton = (props: IAddPostButtonProps) => {
    const { toggleAddPost } = useStore()
    const handleOnAddPostButtonClick = () => {
        toggleAddPost()
    }
    return (
        <button
            className={props.className}
            onClick={handleOnAddPostButtonClick}
        >
            <AiOutlinePlusCircle size={30} />
        </button>
    )
}

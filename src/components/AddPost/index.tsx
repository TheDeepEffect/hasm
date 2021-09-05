import { AiOutlineCloseCircle } from "react-icons/ai";
import { useStore } from "../../utils/Hooks/useStore"


export const AddPost = () => {
    const { state, dispatch } = useStore();
    const { AddPost: { visible } } = state;

    const handleOnCloseClick = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch({ type: "TOGGLE_ADD_POST_DIALOG" })
    }

    return <div className={`${visible ? "flex" : "hidden"} min-h-screen min-w-full fixed bg-transparent items-center justify-center z-50 backdrop-filter  backdrop-blur-lg overflow-x-auto`}>
        <div className="flex items-center justify-center text-white bg-black bg-opacity-50 w-5/6 h-screen relative">
            <button className="absolute right-3 top-2"
                onClick={handleOnCloseClick}

            >
                <AiOutlineCloseCircle
                    size={30}
                />
            </button>
            <div>add post</div>
        </div>
    </div>
}
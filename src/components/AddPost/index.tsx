import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAddPost } from '../../utils/hooks/useAddPost'
import { Button } from '../Button'
import { Input } from '../Input'

const dialogElement = document.getElementById('dialog-root')

export const AddPost = () => {
    const {
        handleOnAddPost,
        state: formState,
        setState,
        loading,
        visible,
        handleOnCloseClick,
        handleOnImageChange,
    } = useAddPost()
    const dialogRef = useRef<HTMLDivElement>(null)

    return createPortal(
        visible ? (
            <div
                className={`flex top-0 left-0 min-h-screen min-w-full fixed bg-transparent items-center justify-center z-50 backdrop-filter  backdrop-blur-lg overflow-x-auto`}
            >
                <div
                    className="w-full h-full absolute top-0 left-0"
                    onClick={handleOnCloseClick}
                />
                <dialog className="flex items-center justify-center text-white bg-black bg-opacity-50 w-5/6 h-screen relative z-20">
                    <button
                        className="absolute right-3 top-2"
                        onClick={handleOnCloseClick}
                    >
                        <AiOutlineCloseCircle size={30} />
                    </button>
                    <div
                        className="w-full h-full flex flex-col items-center justify-around  p-2"
                        ref={dialogRef}
                    >
                        <div className="text-4xl">Add Post</div>
                        <form
                            className="flex flex-col items-center justify-around h-full w-full"
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleOnAddPost()
                            }}
                        >
                            <div className="mb-3 ring-2 ring-red-500 h-2/4 w-4/6 md:w-3/6">
                                <label className="cursor-pointer">
                                    {formState?.imagePreview ? (
                                        ''
                                    ) : (
                                        <p className="flex items-center justify-center w-full h-full">
                                            Click here to add image
                                        </p>
                                    )}
                                    <img
                                        className={`max-h-screen max-w-screen object-contain ${
                                            formState.imagePreview
                                                ? 'w-full h-full'
                                                : ''
                                        }`}
                                        src={formState.imagePreview}
                                        alt=""
                                    />
                                    <Input
                                        type="file"
                                        className="hidden z-20"
                                        onChange={handleOnImageChange}
                                    />
                                </label>
                            </div>
                            <textarea
                                className="h-1/4 w-3/6 text-black"
                                placeholder="Description..."
                                value={formState?.description}
                                onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                    setState('description', e.target.value)
                                }}
                            />
                            <label className="flex items-center justify-center w-4/6 md:w-3/6">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={formState?.isPrivate}
                                    onChange={(e) => {
                                        setState(
                                            'isPrivate',
                                            !formState.isPrivate
                                        )
                                    }}
                                />
                                Keep this post private
                            </label>
                            <Button
                                onClick={handleOnAddPost}
                                disabled={loading}
                            >
                                Add
                            </Button>
                        </form>
                    </div>
                </dialog>
            </div>
        ) : null,
        // @ts-ignore
        dialogElement
    )
}

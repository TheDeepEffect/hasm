import { CommentInput } from './CommentInput'
import { SingleComment } from './SingleComment'

export const Comments = ({ isVisible }: { isVisible: boolean }) => {
    const comments = [SingleComment, SingleComment, SingleComment]
    return (
        <>
            <div
                className={`${
                    isVisible ? 'flex' : 'hidden'
                } flex-col h-96   bg-gray-800 bg-opacity-50 backdrop-filter  backdrop-blur-md  w-full  z-20 p-3 overflow-y-auto`}
            >
                <div className="flex justify-center items-center w-full mb-2">
                    <article className="text-justify max-w-prose">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </article>
                </div>
                <CommentInput />
                {comments.map((Comp) => {
                    return <Comp />
                })}
            </div>
        </>
    )
}

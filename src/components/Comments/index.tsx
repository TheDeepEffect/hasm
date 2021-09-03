import { CommentInput } from "./CommentInput"
import { SingleComment } from "./SingleComment"

export const Comments = ({ isVisible }: { isVisible: boolean }) => {
    const comments = [SingleComment, SingleComment, SingleComment]
    return <>
        <div className={`${isVisible ? "flex" : "hidden"} flex-col h-96   bg-gray-800 bg-opacity-50 backdrop-filter  backdrop-blur-md  w-full  z-20 p-3 overflow-y-auto`}>
            <CommentInput />
            {comments.map(Comp => {
                return <Comp />
            })}
        </div>
    </>
}
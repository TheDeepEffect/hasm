import { Input } from '../Input'

export const CommentInput = () => {
    return (
        <form className="flex h-12 items-center justify-around">
            <img
                src="https://randomuser.me/api/portraits/women/25.jpg"
                alt=""
                className="rounded-full h-full"
            />
            <Input
                type="text"
                placeholder="Add a comment.."
                className="rounded-md  p-3  h-2/3  w-10/12 md:w-11/12  placeholder-white focus:outline-none focus:ring focus:border-blue-600 bg-transparent"
            />
        </form>
    )
}

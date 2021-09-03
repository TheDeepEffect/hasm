export const Post = (props: { image_url: string }) => {
    const { image_url } = props
    return <div
        className="w-screen min-h-screen flex justify-center items-center"
    >
        <img src={image_url}
            className="shadow-2xl sm:w-2/6 md:w-3/6 max-h-4/6"
            alt=""
        />
    </div>
}
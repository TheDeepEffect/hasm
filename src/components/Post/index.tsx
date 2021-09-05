export const Post = (props: { image_url: string }) => {
    const { image_url } = props;
    return <div
        className="flex justify-center items-center"
    >
        <img src={image_url}
            className="max-h-screen max-w-screen h-full  w-5/6 shadow-2xl object-contain"
            alt=""
        />
    </div>
}
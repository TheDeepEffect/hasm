export const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    const { children, ...rest } = props;
    return <button
        className='rounded-md px-3 py-3 shadow-md text-white bg-transparent border-2 border-pink-600  hover:bg-pink-600 my-3 w-3/6'
        {...rest}
    >
        {children}
    </button>
}
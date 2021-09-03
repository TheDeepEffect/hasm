export const Input = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const { className, ...rest } = props;
    return <input className={className ? className : "rounded-md mb-3 px-3 py-3 w-full placeholder-gray-700 focus:outline-none focus:ring focus:border-blue-600"}
        {...rest}
    />
}
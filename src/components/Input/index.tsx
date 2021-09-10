type IInputProps = {
  valid?: boolean;
  message?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export const Input = (props: IInputProps) => {
  const { className, valid = true, message = "", ...rest } = props;
  const validPlaceholder = valid ? "gray" : "red";
  const validBorder = valid ? "blue" : "red";
  const invalidMessage = valid ? "" : message;
  return (
    <div className='w-full mb-3'>
      <input
        className={
          className
            ? className
            : `rounded-md px-3 py-3 w-full  placeholder-${validPlaceholder}-700 focus:outline-none focus:ring focus:ring-${validBorder}-600 border-${validBorder}-600`
        }
        {...rest}
      />
      {invalidMessage ? (
        <span className='flex w-full  font-medium tracking-wide text-red-500 text-xs ml-1'>
          {message}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

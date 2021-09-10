import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const SignUp = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
    }
  };
  const imagePreview = useMemo<string>(() => {
    if (imageFile) {
      const filePrivew = URL.createObjectURL(imageFile);
      return filePrivew;
    }
    return "";
  }, [imageFile]);

  return (
    <div className='h-full w-full flex flex-col justify-between items-center py-5'>
      <h1 className='text-4xl font-bold text-center'>Sign Up</h1>
      <form
        className='sm:w-full lg:w-2/6 flex flex-col justify-evenly items-center text-black'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className='cursor-pointer mb-3  ring-2 ring-red-500 w-36 h-36 rounded-full  flex items-center justify-center'>
          <img
            className={`object-cover rounded-full  ${
              imagePreview ? "w-full h-full" : ""
            }`}
            src={imagePreview}
            alt=''
          />
          <Input
            type='file'
            className='hidden z-20'
            accept='image/png, image/jpeg'
            onChange={handleOnImageChange}
          />
        </label>
        <Input type='text' placeholder='Name' />
        <Input type='text' placeholder='Username' />
        <Input type='text' placeholder='E-mail' />
        <Input type='password' placeholder='Password' />
        <Input type='password' placeholder='Confirm Password' />
        <Button type='submit'>Sign Up</Button>
      </form>
      <Link className='text-white' to='/login'>
        Log In instead?
      </Link>
    </div>
  );
};

export default SignUp;

import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
const src =
  "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/p-naruto-naruto.jpg";
const SignUp = () => {
  return (
    <div className='h-full w-full flex flex-col justify-between items-center py-5'>
      <h1 className='text-4xl font-bold text-center'>Sign Up</h1>
      <form
        className='sm:w-full lg:w-2/6 flex flex-col justify-evenly items-center text-black'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className='cursor-pointer mb-3'>
          <img
            className='object-cover w-24 h-24  rounded-full ring-2 ring-red-500'
            src={src}
            alt=''
          />
          <Input type='file' className='hidden' />
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

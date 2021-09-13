import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useSignup } from "../utils/hooks/useSignup";

const SignUp = () => {
  const { getState, setState, handleOnSubmit, loading } = useSignup();

  return (
    <div className='h-full w-full flex flex-col justify-between items-center py-5'>
      <h1 className='text-4xl font-bold text-center'>Sign Up</h1>
      <form
        className='sm:w-full lg:w-2/6 flex flex-col justify-evenly items-center text-black'
        onSubmit={handleOnSubmit}
      >
        <label className='cursor-pointer mb-3  ring-2 ring-red-500 w-36 h-36 rounded-full  flex items-center justify-center'>
          <img
            className={`object-cover rounded-full  ${
              getState("image") ? "w-full h-full" : ""
            }`}
            src={getState("image")}
            alt=''
          />
          <Input
            type='file'
            className='hidden z-20'
            accept='image/png, image/jpeg'
            onChange={(e) => setState("image", e)}
          />
        </label>
        <Input
          type='text'
          placeholder='Name'
          value={getState("name")}
          onChange={(e) => setState("name", e)}
        />
        <Input
          type='text'
          placeholder='Username'
          value={getState("username")}
          onChange={(e) => setState("username", e)}
        />
        <Input
          type='text'
          placeholder='E-mail'
          value={getState("email")}
          onChange={(e) => setState("email", e)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={getState("password")}
          onChange={(e) => setState("password", e)}
        />
        <Input
          type='password'
          placeholder='Confirm Password'
          value={getState("confirmPassword")}
          onChange={(e) => setState("confirmPassword", e)}
        />
        <Button type='submit' disabled={loading}>
          Sign Up
        </Button>
      </form>
      <Link className='text-white' to='/login'>
        Log In instead?
      </Link>
    </div>
  );
};

export default SignUp;

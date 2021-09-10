import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useLogin } from "../utils/hooks/useLogin";

type IValidState = {
  username: { valid: boolean; message: string };
  password: { valid: boolean; message: string };
};
const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validState, setValidState] = useState<IValidState>({
    username: { valid: true, message: "" },
    password: { valid: true, message: "" },
  });
  const { login, loading } = useLogin();

  const handleOnUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidState((state) => ({
      ...state,
      username: { valid: true, message: "" },
    }));
    setUsername(e.target.value);
  };
  const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidState((state) => ({
      ...state,
      password: { valid: true, message: "" },
    }));
    setPassword(e.target.value);
  };

  const isLoginFormValid = () => {
    if (!username) {
      setValidState((state) => ({
        ...state,
        username: { valid: false, message: "Username is required" },
      }));
      return false;
    }
    if (!password) {
      setValidState((state) => ({
        ...state,
        password: { valid: false, message: "Password is required" },
      }));
      return false;
    }
    return true;
  };

  const handleOnLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginFormValid()) {
      login({
        variables: { loginUsername: username, loginPassword: password },
      });
    }
  };

  return (
    <div className=' h-full w-full flex flex-col justify-between items-center py-5'>
      <h1 className='text-4xl font-bold text-center'>Log In</h1>
      <form
        className='sm:w-full lg:w-2/6  flex flex-col justify-evenly items-center text-black'
        onSubmit={handleOnLoginFormSubmit}
      >
        <Input
          type='text'
          placeholder='Username'
          value={username}
          onChange={handleOnUsernameChange}
          valid={validState.username.valid}
          message={validState.username.message}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={handleOnPasswordChange}
          valid={validState.password.valid}
          message={validState.password.message}
        />
        <Button type='submit' disabled={loading}>
          Log In
        </Button>
      </form>
      <Link className='text-white' to='/signup'>
        Sign Up instead?
      </Link>
    </div>
  );
};
export default LogIn;

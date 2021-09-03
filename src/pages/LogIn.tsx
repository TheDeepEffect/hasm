import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const LogIn = () => {
    return (
        <div className=" h-full w-full flex flex-col justify-between items-center py-5">
            <h1 className='text-4xl font-bold text-center'>Log In</h1>
            <form
                className='sm:w-full lg:w-2/6  flex flex-col justify-evenly items-center text-black'
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Input type='text' placeholder='Username' />
                <Input type='password' placeholder='Password' />
                <Button
                    type='submit'
                >
                    Log In
                </Button>
            </form>
            <Link
                className='text-white'
                to="/signup"
            >
                Sign Up instead?
            </Link>
        </div>
    );
};
export default LogIn;
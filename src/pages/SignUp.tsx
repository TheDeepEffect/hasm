import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useSignup } from '../utils/hooks/useSignup';

const SignUp = () => {
    const {
        state,
        setState,
        handleOnSubmit,
        loading,
        errorState,
        setImageState,
        setErrorState,
    } = useSignup();
    const { name, email, confirmPassword, password, username } = errorState;
    return (
        <div className="h-full w-full flex flex-col justify-between items-center py-5">
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>
            <form
                className="sm:w-full lg:w-2/6 flex flex-col justify-evenly items-center text-black"
                onSubmit={handleOnSubmit}
            >
                <label className="cursor-pointer mb-3  ring-2 ring-red-500 w-36 h-36 rounded-full  flex items-center justify-center">
                    <img
                        className={`object-cover rounded-full  ${
                            state.imagePreview ? 'w-full h-full' : ''
                        }`}
                        src={state.imagePreview}
                        alt=""
                    />
                    <Input
                        type="file"
                        className="hidden z-20"
                        accept="image/png, image/jpeg"
                        onChange={setImageState}
                    />
                </label>
                <Input
                    type="text"
                    placeholder="Name"
                    value={state.name}
                    onChange={(e) => {
                        setState('name', e.target.value);
                        setErrorState((state) => ({
                            ...state,
                            name: {
                                valid: true,
                                message: '',
                            },
                        }));
                    }}
                    valid={name.valid}
                    message={name.message}
                />
                <Input
                    type="text"
                    placeholder="Username"
                    value={state.username}
                    onChange={(e) => {
                        setState('username', e.target.value);
                        setErrorState((state) => ({
                            ...state,
                            username: {
                                valid: true,
                                message: '',
                            },
                        }));
                    }}
                    valid={username.valid}
                    message={username.message}
                />
                <Input
                    type="text"
                    placeholder="E-mail"
                    value={state.email}
                    onChange={(e) => {
                        setState('email', e.target.value);
                        setErrorState((state) => ({
                            ...state,
                            email: {
                                valid: true,
                                message: '',
                            },
                        }));
                    }}
                    valid={email.valid}
                    message={email.message}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={(e) => {
                        setState('password', e.target.value);
                        setErrorState((state) => ({
                            ...state,
                            password: {
                                valid: true,
                                message: '',
                            },
                        }));
                    }}
                    valid={password.valid}
                    message={password.message}
                />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={state.confirmPassword}
                    onChange={(e) => {
                        setState('confirmPassword', e.target.value);
                        setErrorState((state) => ({
                            ...state,
                            confirmPassword: {
                                valid: true,
                                message: '',
                            },
                        }));
                    }}
                    valid={confirmPassword.valid}
                    message={confirmPassword.message}
                />
                <Button type="submit" disabled={loading}>
                    Sign Up
                </Button>
            </form>
            <Link className="text-white" to="/login">
                Log In instead?
            </Link>
        </div>
    );
};

export default SignUp;

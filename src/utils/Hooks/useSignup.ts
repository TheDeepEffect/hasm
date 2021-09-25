import { useMutation } from '@apollo/client'
import { useReducer, useState } from 'react'
import { SIGN_UP } from '../resolvers/mutations'
import { signup, signupVariables } from '../../generated/signup'
import { useAuth } from './useAuth'
import { IState, IReducer, IKey, IInputValue } from '../../types'

export const useSignup = () => {
    const [errorState, setErrorState] = useState({
        name: {
            valid: true,
            message: '',
        },
        email: {
            valid: true,
            message: '',
        },
        username: {
            valid: true,
            message: '',
        },
        password: {
            valid: true,
            message: '',
        },
        confirmPassword: {
            valid: true,
            message: '',
        },
    })

    const initialState: IState = {
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        imageFile: null,
        imagePreview: '',
    }
    const reducer: IReducer = (state, { type, payload }) => {
        const { key, value } = payload
        switch (type) {
            case 'SET_STATE':
                return {
                    ...state,
                    [key]: value,
                }

            default:
                throw new Error(`Unhandled action type: ${type}`)
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const { setCurrentUser } = useAuth()
    const [onSignUp, { loading, error, data }] = useMutation<
        signup,
        signupVariables
    >(SIGN_UP, {
        onCompleted: (data: signup) => {
            if (data?.signup?.__typename === 'AuthPayload') {
                setCurrentUser({
                    expiresAt: data.signup.expiresAt || '',
                    user: data.signup.user,
                })
            } else {
                setCurrentUser({
                    expiresAt: '',
                    user: null,
                })
            }
        },
    })

    const setImageState = (e: IInputValue) => {
        const file = e?.target?.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            // @ts-ignore
            reader.onload = (img) => setState('imageFile', img.target?.result)
            setState('imagePreview', URL.createObjectURL(file))
        }
    }

    const setState = (key: IKey, value: string | null) => {
        dispatch({ type: 'SET_STATE', payload: { key, value } })
    }

    const validateEmail = (email: string) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email.toLowerCase())
    }

    const validateUsername = (username: string) => {
        const re = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
        return re.test(username.toLowerCase())
    }
    const validatePassword = (password: string) => {
        const re =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return re.test(password)
    }
    const validateData = () => {
        const { name, username, email, password, confirmPassword } = state
        if (!name) {
            setErrorState((state) => ({
                ...state,
                name: { valid: false, message: 'Name is required' },
            }))
            return false
        }
        if (!username) {
            setErrorState((state) => ({
                ...state,
                username: { valid: false, message: 'Username is required' },
            }))
            return false
        }
        if (!email) {
            setErrorState((state) => ({
                ...state,
                email: { valid: false, message: 'E-mail is required' },
            }))
            return false
        }
        if (!password) {
            setErrorState((state) => ({
                ...state,
                password: { valid: false, message: 'Password is required' },
            }))
            return false
        }
        if (!confirmPassword) {
            setErrorState((state) => ({
                ...state,
                confirmPassword: {
                    valid: false,
                    message: 'Please re-enter your password',
                },
            }))
            return false
        }
        if (!validateUsername(username)) {
            setErrorState((state) => ({
                ...state,
                username: { valid: false, message: 'Enter valid username' },
            }))
            return false
        }
        if (!validateEmail(email)) {
            setErrorState((state) => ({
                ...state,
                email: { valid: false, message: 'Enter valid email' },
            }))
            return false
        }
        if (!validatePassword(password)) {
            setErrorState((state) => ({
                ...state,
                password: {
                    valid: false,
                    message:
                        'Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
                },
            }))
            return false
        }
        if (password !== confirmPassword) {
            setErrorState((state) => ({
                ...state,
                password: { valid: false, message: "Passwords doesn't match" },
                confirmPassword: {
                    valid: false,
                    message: "Passwords doesn't match",
                },
            }))
            return false
        }
        return true
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, username, email, password, imageFile } = state

        if (validateData()) {
            onSignUp({
                variables: {
                    signupEmail: email,
                    signupName: name,
                    signupUsername: username,
                    signupPassword: password,
                    signupProfilePic: imageFile,
                },
            })
        }
    }

    return {
        state,
        setState,
        handleOnSubmit,
        loading,
        error,
        data,
        errorState,
        setErrorState,
        setImageState,
    }
}

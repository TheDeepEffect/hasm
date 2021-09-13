import { useMutation } from "@apollo/client";
import { useState } from "react"
import { SIGN_UP } from "../resolvers/mutations";
import { signup, signupVariables } from "../../generated/signup";
import { useAuth } from "./useAuth";

type IInputValue = React.ChangeEvent<HTMLInputElement>;
type Ikey = "name" | "email" | "username" | "password" | "confirmPassword" | "image";
export const useSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imageFile, setImageFile] = useState<string | null>(null);
    const [imagePreview, setimagePreview] = useState("");

    const { setCurrentUser } = useAuth();
    const [onSignUp, { loading, error, data }] = useMutation<signup, signupVariables>(SIGN_UP, {
        onCompleted: (data: signup) => {
            if (data?.signup?.__typename === "AuthPayload") {
                setCurrentUser({
                    expiresAt: data.signup.expiresAt || "",
                    user: data.signup.user,
                });
            } else {
                setCurrentUser({
                    expiresAt: "",
                    user: null
                })
            }
        }
    })

    const setImageState = (e: IInputValue) => {
        const file = e?.target?.files?.[0]
        if (file) {

            var reader = new FileReader();
            reader.onloadend = function () {
                // @ts-ignore
                setImageFile(reader.result)
            }
            setimagePreview(URL.createObjectURL(file))
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setimagePreview("")
        }
    };

    const setState = (key: Ikey, e: IInputValue) => {
        let value = e.target.value;
        switch (key) {
            case "name":
                setName(value);
                break;
            case "username":
                setUsername(value.replaceAll(" ", ""));
                break;
            case "email":
                setEmail(value.toLowerCase());
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            case "image":
                setImageState(e);
                break;
            default:
                break;
        }
    };

    const getState = (key: Ikey) => {
        switch (key) {
            case "name":
                return name;
            case "username":
                return username;
            case "email":
                return email;
            case "password":
                return password;
            case "confirmPassword":
                return confirmPassword;
            case "image":
                return imagePreview;
            default:
                return "";
        }
    };

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    };

    const validateUsername = (username: string) => {
        const re = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
        return re.test(username.toLowerCase());
    };

    const validateData = () => {
        if (!name) {
            return false;
        }
        if (!username) {
            return false;
        }
        if (!email) {
            return false;
        }
        if (!password) {
            return false;
        }
        if (!confirmPassword) {
            return true;
        }
        if (password !== confirmPassword) {
            return false;
        }
        if (!validateEmail(email)) {
            return false;
        }
        if (!validateUsername(username)) {
            return false;
        }
        return true;
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateData()) {
            onSignUp({ variables: { signupEmail: email, signupName: name, signupUsername: username, signupPassword: password, signupProfilePic: imageFile } })
        }
    }



    return { setState, getState, handleOnSubmit, loading, error, data }
}
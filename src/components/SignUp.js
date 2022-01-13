import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

const SignUp = ({ updateStatus }) => {
    const nav = useNavigate();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirm_password] = useState();
    const [errors, setErrors] = useState();

    const onUsernameChange = (e) => {
        setUsername(e.target.value);        
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onConfirmChange = (e) => {
        setConfirm_password(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/signup`, {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password,
                confirm_password
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        if (data.err || data.errors) {
            setErrors(data);
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            updateStatus();
            nav('/');
        }
    }

    return (
        <div className="sign_up">
            <h1>Sign up to start using to do</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormField name="username" type="text"
                    require={true} handleChange={onUsernameChange} />
                <FormField name="email" type="text"
                    require={true} handleChange={onEmailChange} />
                <FormField name="password" type="text"
                    require={true} handleChange={onPasswordChange} />
                <FormField name="confirm_password" type="text"
                    require={true} handleChange={onConfirmChange} />
                <input type="submit" value="Sign Up" />
            </form>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default SignUp;
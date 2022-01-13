import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

const LogIn = ({ updateStatus }) => {
    const nav = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // post fetch
        const response = await fetch(`http://localhost:5000/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
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
        <div className="log_in">
            <h1>Log in to start using to do</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormField name="email" type="text" 
                    require={true} handleChange={onEmailChange} />
                <FormField name="password" type="password"
                    require={true} handleChange={onPasswordChange} />
                <input type="submit" value="Log In" />
            </form>
            {errors && <Errors errors={errors}/>}
        </div>
    )
}

export default LogIn;
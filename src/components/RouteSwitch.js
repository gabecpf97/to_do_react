import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import LogIn from "./account/LogIn";
import Menu from "./Menu";
import SignUp from "./account/SignUp";
import "../style/style.css";

const RouteSwitch = () => {
    const prefix = "";
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (localStorage.token)
            setStatus(true);
    }, []);

    const changeStatus = () => {
        setStatus(status => !status);
    }

    return (
        <BrowserRouter>
            <Menu status={status} />
            <Routes>
                <Route path={`${prefix}/`} element={<Home />} />
                <Route path={`${prefix}/login`} element={<LogIn updateStatus={changeStatus} />} />
                <Route path={`${prefix}/signup`} element={<SignUp updateStatus={changeStatus} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
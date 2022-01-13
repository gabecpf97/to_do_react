import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const RouteSwitch = () => {
    const prefix = "";

    return (
        <BrowserRouter>
            <Routes>
                <Route path={`${prefix}/`} element={<Home />} />
                <Route path={`${prefix}/login`} element={<LogIn />} />
                <Route path={`${prefix}/signup`} element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
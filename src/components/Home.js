import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const nav = useNavigate();

    useEffect(() => {
        if (!localStorage.token) {
            nav('/login');
        }
    }, [nav]);

    return (
        <div className="home">
            <h1>Welcome to to do list</h1>
        </div>
    )
}

export default Home;
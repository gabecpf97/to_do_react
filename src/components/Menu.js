import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ status }) =>  {

    return (
        <div className="menu">
            <Link to="/">To Do</Link>
            <div className="pages">
                <Link to="/login" className="page">Log In</Link>
                <Link to="/signup" className="page">Sign Up</Link>
            </div>
        </div>
    )
}

export default Menu;
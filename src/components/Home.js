import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import ListTab from "./ListTab";
import ShowList from "./ShowList";

const Home = () => {
    const nav = useNavigate();
    const [lists, setLists] = useState();
    const [display, setDisplay] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch(`http://localhost:5000/lists`, {
                    headers:{
                        "Authorization" : `Bearer ${localStorage.token}`,
                    }
                });
                const data = await response.json();
                if (isMount) {
                    if (data.err) {
                        setErrors(data);
                    } else {
                        setDisplay(data.result[0].id);
                        setLists(data.result);
                    }
                }
            } catch (err) {
                setErrors(err);
            }
        }
        let isMount = true;
        if (!localStorage.token) {
            nav('/login');
        } else {
            fetchList();
        }

        return () => {
            isMount = false;
        }
    }, [nav]);

    const handleDisplay = (targetId) => {
        setDisplay(targetId);
    }

    return (
        <div className="home">
            <h1>Welcome to to do list</h1>
            {lists && display && 
                <div className="lists">
                    <ListTab lists={lists} clicked={handleDisplay} />
                    <ShowList id={display} />
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default Home;
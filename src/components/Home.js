import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./general/Errors";
import ListForm from "./list/ListForm";
import ListTab from "./list/ListTab";
import ShowList from "./list/ShowList";

const Home = () => {
    const nav = useNavigate();
    const [lists, setLists] = useState();
    const [display, setDisplay] = useState();
    const [refresh, setRefresh] = useState(false);
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
                        setRefresh(false);
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
            if (!lists || refresh)
                fetchList();
        }

        return () => {
            isMount = false;
        }
    }, [nav, lists, refresh]);

    const handleDisplay = (targetId) => {
        setDisplay(targetId);
    }

    const handleRefresh = () => {
        setRefresh(true);
    }

    return (
        <div className="home">
            <h1>Welcome to to do list</h1>
            {lists && display && 
                <div className="lists">
                    <ListForm reload={handleRefresh} />
                    <ListTab lists={lists} clicked={handleDisplay} refresh={handleRefresh}/>
                    <ShowList id={display} />
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default Home;
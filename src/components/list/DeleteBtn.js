import React, { useState } from "react";
import Errors from "../general/Errors";

const DeleteBtn = ({ item, list, refresh }) => {
    const [toggle, setToggle] = useState(false);
    const [errors, setErrors] = useState();

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleDelete = async () => {
        const response = await fetch (`http://localhost:5000/${list ? `list/${list.id}` : `item/${item.id}`}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
            }
        });
        const data = await response.json();
        if (data.err || data.errors) {
            setErrors(data);
        } else {
            setToggle(!toggle);
            refresh();
        }
    }

    return (
        <div className="delete">
            <button onClick={() => handleToggle()}>
                {toggle ? 'Cancel' : list ? 'Delete List' : 'Delete Item'}
            </button>
            {toggle && 
                <div className="delete">
                    <h3>Really delete {list ? list.name : 'this item'} ?</h3>
                    <button onClick={() => handleDelete()}>yes</button>
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default DeleteBtn;
import React, { useState } from "react";
import Errors from "../general/Errors";

const ItemDelete = ({ id, reload }) => {
    const [errors, setErrors] = useState();

    const handleClicked = async () => {
        const response = await fetch(`http://localhost:5000/item/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
            }
        });
        const data = await response.json();
        if (data.err || data.errors) {
            setErrors(data);
        } else {
            reload();
        }
    }

    return (
        <div className="delete_item">
            <h3>Really Delete?</h3>
            <button onClick={() => handleClicked()}>Yes</button>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default ItemDelete;
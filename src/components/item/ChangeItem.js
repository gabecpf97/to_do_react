import React, { useState } from "react";
import Errors from "../general/Errors";

const ChangeItem = ({ item, reload }) => {
    const [errors, setErrors] = useState();

    const handleChanges = async () => {
        const response = await fetch(`http://localhost:5000/item/${item.id}/status`, {
            method: "PUT",
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
        <div className="change">
            <button onClick={() => handleChanges()}>{item.status ? 'finish' : 'Not finish'}</button>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default ChangeItem;
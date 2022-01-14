import React, { useState } from "react";
import Errors from "../general/Errors";
import FormField from "../general/FormField";

const CreateItem = ({ reload, belong }) => {
    const [toggle, setToggle] = useState(false);
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const [priority, setPriority] = useState();
    const [errors, setErrors] = useState();

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const onPriorityChange = (e) => {
        setPriority(e.target.value);
    }

    const handleToggle = () => {
        setToggle(toggle => !toggle);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/item`, {
            method: "POST",
            body: JSON.stringify({
                title,
                message,
                priority,
                belong
            }),
            headers: {
                "Authorization": `Bearer ${localStorage.token}`,
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        if (data.err || data.errors) {
            setErrors(data);
        } else {
            setToggle(toggle => !toggle);
            reload();
        }
    }

    return (
        <div className="create_item">
            {!toggle && <button onClick={() => handleToggle()}>Add Item</button>}
            {toggle &&
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FormField name="Title" type="text" require={true}
                        handleChange={onTitleChange} />
                    <FormField name="Message" type="text"
                        handleChange={onMessageChange} />
                    <label>priority: </label>
                    <select required={true} onChange={(e) => onPriorityChange(e)}>
                        <option value="0">Low</option>
                        <option value="1">Middle</option>
                        <option value="2">High</option>
                    </select>
                    <input type="submit" value="Add" />
                </form>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default CreateItem;
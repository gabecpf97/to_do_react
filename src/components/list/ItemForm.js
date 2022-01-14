import React, { useEffect, useState } from "react";
import Errors from "../general/Errors";
import FormField from "../general/FormField";

const ItemForm = ({ reload, belong, item }) => {
    const [toggle, setToggle] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('');
    const [errors, setErrors] = useState();

    useEffect(() => {
        if (item) {
            setTitle(item.title);
            setMessage(item.message);
            setPriority(item.priority);
            setToggle(true);
        }
    }, [item]);

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

        const response = await fetch(`http://localhost:5000/item${item ? `/${item.id}` : ''}`, {
            method: item ? 'PUT' : 'POST',
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
            {!item &&
                <button onClick={() => handleToggle()}>{toggle ? 'Cancel' : 'Add Item'}</button>
            }
            {toggle &&
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FormField name="Title" type="text" require={true}
                        handleChange={onTitleChange} value={title} />
                    <FormField name="Message" type="text"
                        handleChange={onMessageChange} value={message} />
                    <label>priority: </label>
                    <select required={true} value={priority} onChange={(e) => onPriorityChange(e)}>
                        <option value="0">Low</option>
                        <option value="1">Middle</option>
                        <option value="2">High</option>
                    </select>
                    <input type="submit" value={item ? 'edit' : 'Add'} />
                </form>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default ItemForm;
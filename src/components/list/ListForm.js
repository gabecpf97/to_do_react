import React, { useEffect, useState } from "react";
import Errors from "../general/Errors";
import FormField from "../general/FormField";

const ListForm = ({ list, reload }) => {
    const [name, setName] = useState('');
    const [toggle, setToggle] = useState(false);
    const [errors, setErrors] = useState();

    useEffect(() => {
        if (list)
            setName(list.name);
    }, [list]);

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch (`http://localhost:5000/list${list ? `/${list.id}` : ''}`, {
            method: list ? 'PUT' : 'POST',
            body: JSON.stringify({
                name,
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
            setToggle(!toggle);
            reload();
        }
    }

    return (
        <div className="list_form">
            <button onClick={() => handleToggle()}>
                {toggle ? 'Cancel' : list ? 'Edit name' : 'Add List'}
            </button>
            {toggle && 
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FormField name="name" type="text" 
                        require={true} handleChange={onNameChange} value={name} />
                    <input type="submit" value={list ? 'Edit' : 'Add'} />
                </form>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default ListForm;
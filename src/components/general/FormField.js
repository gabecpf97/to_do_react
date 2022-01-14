import React from "react";

const FormField = ({ name, type, require, value, handleChange }) => {

    return (
        <div className="field">
            <label htmlFor={name}>{name}: </label>
            {type !== "textarea" &&
                <input type={type} name={name} required={require}
                    value={value} onChange={(e) => handleChange(e)} />
            }
            {type === "textarea" &&
                <textarea name={name} required={require} 
                    value={value} onChange={(e) => handleChange(e)} />
            }
        </div>
    )
}

export default FormField;
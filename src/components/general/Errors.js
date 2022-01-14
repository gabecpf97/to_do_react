import React from "react";

const Errors = ({ errors }) => {

    return (
        <div className="errors">
            {errors.err && <p>{errors.err}</p>}
            {errors.errors && errors.errors.map((error, i) => {
                return (
                    <p key={i}>{error.msg}</p>
                )
            })}
        </div>
    )
}

export default Errors;
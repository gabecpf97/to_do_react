import React, { useState } from "react";

const ListItem = ({ item }) => {
    const [toggle, setToggle] = useState(false);

    const handleClicked = () => {
        setToggle(toggle => !toggle);
    }

    return (
        <li className="item">
            <p>{item.title}</p>
            <p>{item.priority}</p>
            <button onClick={() => handleClicked()}>
                {toggle ? 'Show Less' : 'Show More'}
            </button>
            {toggle && <p>{item.message}</p>}
        </li>
    )
}

export default ListItem;
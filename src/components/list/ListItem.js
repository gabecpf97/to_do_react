import React, { useState } from "react";
import ItemDelete from "./ItemDelete";
import ItemForm from "./ItemForm";

const ListItem = ({ item, reload }) => {
    const [toggle, setToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);

    const handleClicked = () => {
        setToggle(toggle => !toggle);
    }

    const handleEditClicked = () => {
        setEditToggle(editToggle => !editToggle);
    }

    const handleDelete = () => {
        setDeleteToggle(deleteToggle => !deleteToggle);
    }

    const handleRefresh = () => {
        if (editToggle)
            setEditToggle(editToggle => !editToggle);
        if (deleteToggle)
            setDeleteToggle(deleteToggle => !deleteToggle);
        reload();
    }

    return (
        <li className="item">
            <p>Title: {item.title}</p>
            <p>
                Priority: {item.priority < 1 ? 'Low' : item.priority < 2 ? 'Middle' : 'High'}
            </p>
            <button onClick={() => handleClicked()}>
                {toggle ? 'Show Less' : 'Show More'}
            </button>
            <button onClick={() => handleEditClicked()}>
                {editToggle ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={() => handleDelete()}>{deleteToggle ? 'Cancel' : 'Delete' }</button>
            {editToggle && <ItemForm item={item} reload={handleRefresh} />}
            {deleteToggle && <ItemDelete id={item.id} onCancel={handleDelete} reload={handleRefresh} />}
            {toggle && <p>Message: {item.message}</p>}
        </li>
    )
}

export default ListItem;
import React, { useState } from "react";
import ItemForm from "./ItemForm";

const EditItem = ({ item, refresh }) => {
    const [editToggle, setEditToggle] = useState(false);
    
    const handleEditClicked = () => {
        setEditToggle(!editToggle);
    }

    const handleReload = () => {
        setEditToggle(!editToggle);
        refresh();
    }

    return (
        <div className="edit_item">
            <button onClick={() => handleEditClicked()}>
                {editToggle ? 'Cancel' : 'Edit'}
            </button>
            {editToggle && <ItemForm item={item} reload={handleReload} />}
        </div>
    )
}

export default EditItem;
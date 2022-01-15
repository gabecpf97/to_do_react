import React, { useEffect, useState } from "react";
import Errors from "../general/Errors";
import DeleteBtn from "./DeleteBtn";
import ItemForm from "./ItemForm";

const ListItem = ({ id, refresh }) => {
    const [item, setItem] = useState();
    const [errors, setErrors] = useState();
    const [msgToggle, setMsgToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:5000/item/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.token}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    setErrors(data);
                } else {
                    setItem(data.result[0]);
                    setReload(false);
                }
            } catch (err) {
                setErrors(err);
            }
        };
        if (!item || reload) {
            fetchItem();
        }
    }, [id, item, reload]);

    const handleMsgClicked = () => {
        setMsgToggle(!msgToggle);
    }

    const handleEditClicked = () => {
        setEditToggle(!editToggle);
    }

    const handleRefresh = () => {
        if (editToggle) {
            setEditToggle(!editToggle);
            setReload(true);
        } else {
            refresh();
        }
    }

    return (
        <li>
            {item && 
                <div className="item">
                    <div className="detail">
                        <p>Title: {item.title}</p>
                        <p>
                            Priority: {item.priority < 1 ? 'Low' : item.priority < 2 ? 'Middle' : 'High'}
                        </p>
                        {item.message && 
                            <div className="message">
                                <button onClick={() => handleMsgClicked()}>
                                    {msgToggle ? 'Show Less' : 'Show More'}
                                </button>
                                {msgToggle && <p>Message: {item.message}</p>}
                            </div>
                        }
                    </div>
                    <div className="edit_item">
                        <button onClick={() => handleEditClicked()}>
                            {editToggle ? 'Cancel' : 'Edit'}
                        </button>
                        {editToggle && <ItemForm item={item} reload={handleRefresh} />}
                    </div>
                    <DeleteBtn item={item} refresh={handleRefresh} />
                </div>
            }
            {errors && <Errors errors={errors} />}
        </li>
    )
}

export default ListItem;
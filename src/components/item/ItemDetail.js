import React, { useState } from "react";
import ChangeItem from "./ChangeItem";

const ItemDetail = ({ item, refresh }) => {
    const [msgToggle, setMsgToggle] = useState(false);

    const handleMsgClicked = () => {
        setMsgToggle(!msgToggle);
    }

    return (
        <div className="detail">
            <ChangeItem item={item} reload={refresh} />
            <p>Title: {item.title}</p>
            <p>
                Priority: {item.priority < 1 ? 'Low' : item.priority < 2 ? 'Middle' : 'High'}
            </p>
            <p>Due: {item.due_date.substring(0, 10)}</p>
            {item.message && 
                <div className="message">
                    <button onClick={() => handleMsgClicked()}>
                        {msgToggle ? 'Show Less' : 'Show More'}
                    </button>
                    {msgToggle && <p>Message: {item.message}</p>}
                </div>
            }
         </div>
    )
}

export default ItemDetail;
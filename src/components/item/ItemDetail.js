import React, { useState } from "react";
import ChangeItem from "./ChangeItem";

const ItemDetail = ({ item, refresh }) => {
    const [msgToggle, setMsgToggle] = useState(false);

    const handleMsgClicked = () => {
        setMsgToggle(!msgToggle);
    }

    return (
        <div className="item_detail">
            <ChangeItem item={item} reload={refresh} />
            <div className="basic_detail" onClick={() => handleMsgClicked()}>
                <p>Title: {item.title}</p>
                <p>
                    Priority: {item.priority < 1 ? 'Low' : item.priority < 2 ? 'Middle' : 'High'}
                </p>
                <p>Due: {item.due_date.substring(0, 10)}</p>
            </div>
            {item.message && 
                <div className="message">
                    {msgToggle && <p>Message: {item.message}</p>}
                </div>
            }
         </div>
    )
}

export default ItemDetail;
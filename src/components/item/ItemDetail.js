import React, { useState } from "react";
import ChangeItem from "./ChangeItem";

const ItemDetail = ({ item, refresh }) => {
    const [msgToggle, setMsgToggle] = useState(false);

    const handleMsgClicked = () => {
        setMsgToggle(!msgToggle);
    }

    return (
        <div className="item_detail">
            <div className="always_on">
                <ChangeItem item={item} reload={refresh} />
                <div className="basic_detail" onClick={() => handleMsgClicked()}>
                    <p>{item.title}</p>
                    <p>
                        {item.priority < 1 ? 'Low' : item.priority < 2 ? 'Middle' : 'High'}
                    </p>
                    <p>{item.due_date.substring(0, 10)}</p>
                </div>
            </div>
            {item.message && msgToggle &&
                <div className="message">
                    <h2>Note: </h2>
                    <p>{item.message}</p>
                </div>
            }
         </div>
    )
}

export default ItemDetail;
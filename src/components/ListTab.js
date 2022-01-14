import React from "react";

const ListTab = ({ lists, clicked }) => {

    return (
        <ul className="list">
            {lists.map(list => {
                return (
                    <li key={list.id}>
                        <button onClick={() => clicked(list.id)}>
                            {list.name}    
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

export default ListTab;
import React from "react";
const ListTab = ({ lists, clicked, refresh, display }) => {

    return (
        <ul className="lists">
            {lists.map(list => {
                return (
                    <li className="list" key={list.id}>
                        <button onClick={() => clicked({id: list.id, name: list.name})}>
                            {list.name}    
                        </button>
                    </li>
                )
            })}
            {lists.length < 1 &&
                <h2>You have no to do list create one now</h2>
            }
        </ul>
    )
}

export default ListTab;
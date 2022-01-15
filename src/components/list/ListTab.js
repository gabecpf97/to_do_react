import React from "react";
import ListForm from "./ListForm";

const ListTab = ({ lists, clicked, refresh }) => {

    return (
        <ul className="list">
            {lists.map(list => {
                return (
                    <li key={list.id}>
                        <button onClick={() => clicked(list.id)}>
                            {list.name}    
                        </button>
                        <ListForm list={list} reload={refresh} />
                    </li>
                )
            })}
        </ul>
    )
}

export default ListTab;
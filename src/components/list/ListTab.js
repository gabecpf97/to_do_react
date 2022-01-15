import React from "react";
import DeleteBtn from "./DeleteBtn";
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
                        <DeleteBtn list={list} refresh={refresh} />
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
import React, { useEffect, useState } from "react";
import Errors from "../general/Errors";
import ItemForm from "./ItemForm";
import ListItem from "./ListItem";

const ShowList = ({ id }) => {
    const [items, setItems] = useState();
    const [refresh, setRefresh] = useState();
    const [errors, setErros] = useState();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/all_item/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.token}`,
                    }
                });
                const data = await response.json();
                if (data.err || data.errors) {
                    setErros(data);
                } else {
                    setItems(data.itemList);
                }
            } catch (err) {
                setErros(err);
            }
        }
        fetchItems();
    }, [id, refresh]);

    const handleRefresh = () => {
        setRefresh(refresh => !refresh);
    }

    return (
        <div className="list">
            {items && <ItemForm reload={handleRefresh} belong={id} />}
            <ul className="items">
                {items && items.map(item => {
                    return (
                        <ListItem item={item} key={item.id} reload={handleRefresh} />
                    )
                })}
                {items && items.length < 1 &&
                    <li className="item">Empty list add item now</li>
                }
            </ul>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default ShowList;
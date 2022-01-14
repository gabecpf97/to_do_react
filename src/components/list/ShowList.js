import React, { useEffect, useState } from "react";
import Errors from "../general/Errors";
import ItemForm from "./ItemForm";
import ListItem from "./ListItem";

const ShowList = ({ id }) => {
    const [items, setItems] = useState();
    const [refresh, setRefresh] = useState(false);
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
                    setRefresh(false);
                }
            } catch (err) {
                setErros(err);
            }
        }
        if (!items || refresh) {
            fetchItems();
        }
    }, [id, items, refresh]);

    const handleRefresh = () => {
        setRefresh(true);
    }

    return (
        <div className="list">
            <ItemForm reload={handleRefresh} belong={id} />
            {items &&
                <ul className="items">
                    {items && items.map(item => {
                        return (
                            <ListItem id={item.id} key={item.id} refresh={handleRefresh} />
                        )
                    })}
                    {items && items.length < 1 &&
                        <li className="item">Empty list add item now</li>
                    }
                </ul>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default ShowList;
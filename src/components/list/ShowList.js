import React, { useEffect, useState } from "react";
import Errors from "../general/Errors";
import ItemForm from "../item/ItemForm";
import ListItem from "../item/ListItem";
import DeleteBtn from "./DeleteBtn";
import ListForm from "./ListForm";

const ShowList = ({ list, to_reload }) => {
    const [prev, setPrev] = useState();
    const [items, setItems] = useState();
    const [refresh, setRefresh] = useState(false);
    const [errors, setErros] = useState();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/all_item/${list.id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.token}`,
                    }
                });
                const data = await response.json();
                if (isMounted) {
                    if (data.err || data.errors) {
                        setErros(data);
                    } else {
                        setPrev(list.id);
                        setItems(data.itemList);
                        setRefresh(false);
                    }
                }
            } catch (err) {
                setErros(err);
            }
        }
        let isMounted = true;
        if (!items || refresh || list.id !== prev) {
            fetchItems();
        }
        return () => {
            isMounted = false;
        }
    }, [list, items, refresh, prev]);

    const handleRefresh = () => {
        setRefresh(true);
    }

    return (
        <div className="cur_list">
            <h2>{list.name}</h2>
            <div className="modify_list">
                <ListForm list={list} reload={to_reload} />
                <DeleteBtn list={list} refresh={to_reload} />
                <ItemForm reload={handleRefresh} belong={list.id} />
            </div>
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
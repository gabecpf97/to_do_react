import React, { useEffect, useState } from "react";
import Errors from "../general/Errors";
import DeleteBtn from "../list/DeleteBtn";
import EditItem from "./EditItem";
import ItemDetail from "./ItemDetail";

const ListItem = ({ id, refresh }) => {
    const [item, setItem] = useState();
    const [errors, setErrors] = useState();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:5000/item/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.token}`,
                    }
                });
                const data = await response.json();
                if (isMounted) {
                    if (data.err) {
                        setErrors(data);
                    } else {
                        setItem(data.result[0]);
                        setReload(false);
                    }
                }
            } catch (err) {
                setErrors(err);
            }
        };
        let isMounted = true;
        if (!item || reload) {
            fetchItem();
        }
        return () => {
            isMounted = false;
        }
    }, [id, item, reload]);

    const handleRefresh = () => {
        setReload(true);
    }

    return (
        <li>
            {item && 
                <div className="item">
                    <ItemDetail item={item} refresh={handleRefresh}/>
                    <EditItem item={item} refresh={handleRefresh} />
                    <DeleteBtn item={item} refresh={refresh} />
                </div>
            }
            {errors && <Errors errors={errors} />}
        </li>
    )
}

export default ListItem;
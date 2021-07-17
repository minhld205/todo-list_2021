import { useEffect, useState } from "react";
import { COLLECTION_TODOS } from "../../../services/firebase";
import { firebaseConnect } from "../../../utils";
import { valueFilterBtns, valueOfTask } from "../constant";
import { TodoContext } from "../contextAPI";

const firebaseConn = firebaseConnect(COLLECTION_TODOS);

export const TodolistContainer = (props) => {
    const [dataState, setData] = useState(null);
    const [toggle, setToggle] = useState(valueOfTask.ACTIVE);
    const [filter, setFilter] = useState(valueFilterBtns.ALL);

    const handleAddItem = (newItem) => {
        const item = { name: newItem, isActive: valueOfTask.ACTIVE };
        firebaseConn.setItem(item).then(() => {
            handleGetList();
            setFilter(valueFilterBtns.ALL);
        });
    };

    const onChangeCheckbox = (checked, item) => {
        const isActive = checked ? valueOfTask.DONE : valueOfTask.ACTIVE;
        firebaseConn.updateItem(item.id, { isActive }).then(() => handleGetList());
    };

    const onClickToggleAll = () => {
        const toggleValue = toggle === valueOfTask.DONE ? valueOfTask.ACTIVE : valueOfTask.DONE;
        firebaseConn
            .updateAll({
                isActive: toggleValue
            })
            .then(() => {
                handleGetList();
                setToggle(toggleValue);
                setFilter(valueFilterBtns.ALL);
            });
    };

    const handleFilterItem = (filterValue) => {
        setFilter(filterValue);
    };

    const handleRemoveItem = (id) => {
        firebaseConn.deleteItem(id).then(() => {
            handleGetList();
        });
    };

    const handleGetList = () => {
        firebaseConn.getList((data) => {
            setData(data);
        });
    };

    useEffect(() => {
        handleGetList();
    }, []);

    return (
        <TodoContext.Provider
            value={{
                data: dataState,
                filter,
                toggle,
                handleAddItem,
                onChangeCheckbox,
                onClickToggleAll,
                handleFilterItem,
                handleRemoveItem
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};

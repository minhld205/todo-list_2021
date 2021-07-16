import React, { useContext } from "react";

export const initData = {
    data: [
        {
            id: 1,
            name: "todo1",
            isActive: 1
        },
        {
            id: 2,
            name: "todo2",
            isActive: 2
        }
    ]
};

export const TodoContext = React.createContext();

export function withContextTodolist(Component) {
    return (props) => {
        const context = useContext(TodoContext);
        return <Component {...props} {...context} />;
    };
}

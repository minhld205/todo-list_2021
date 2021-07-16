import { Filter, Tasklisting, FormInput } from "./components";
import { TodolistContainer } from "./container";
import { WrapperTodolist } from "./TodolistStyled";

export const Todolist = (props) => {
    return (
        <WrapperTodolist>
            <h1 className={"page-title text-align-left"}>{props.title}</h1>
            <TodolistContainer>
                <FormInput />
                <Tasklisting />
                <Filter />
            </TodolistContainer>
        </WrapperTodolist>
    );
};

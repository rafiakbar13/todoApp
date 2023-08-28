import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
const Content = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const sortedTodoList = [...todoList];
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  const filterTodoList = sortedTodoList.filter((todo) => {
    if (filterStatus === "All") {
      return true;
    }
    return todo.status === filterStatus;
  });

  return (
    <div>
      {filterTodoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Content;

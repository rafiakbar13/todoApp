import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodo = window.localStorage.getItem("todoList");
  if (localTodo) {
    return JSON.parse(localTodo);
  }
  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};
const initialValue = {
  filterStatus: "All",
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.push({
          ...action.payload,
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArray));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArray.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArray));
        state.todoList = todoListArray;
        // const newTodoList = todoListArray.filter(
        //   (todo) => todo.id !== action.payload
        // );
        // window.localStorage.setItem("todoList", JSON.stringify(newTodoList));
        // state.todoList = newTodoList;
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            // todoListArray[index] = action.payload;
            todo.title = action.payload.title;
            todo.description = action.payload.description;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArray));
        state.todoList = todoListArray;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});
export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;

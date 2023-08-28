import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlices";
import { toast } from "react-hot-toast";
import TodoModal from "./TodoModal";
const completeStyle = {
  textDecoration: "line-through",
  color: "#ccc",
  fontStyle: "italic",
};
const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  console.log(todo);

  const handleCheck = () => {
    dispatch(
      updateTodo({
        ...todo,
        status: isChecked ? "incomplete" : "complete",
      })
    );
  };

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted");
  };

  const updateTodos = () => {
    setIsOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 py-3 my-2 bg-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <button type="button" onClick={handleCheck}>
            <input
              type="checkbox"
              className="w-5 h-5 mr-5 cursor-pointer"
              checked={isChecked}
              onChange={() => setChecked(!isChecked)}
            />
          </button>

          <div className="gap-8">
            <h1
              className="text-lg font-semibold"
              style={isChecked === true ? completeStyle : null}
            >
              {todo.title}
            </h1>
            <p className="text-sm text-gray-500">{todo.description}</p>
            <p className="text-sm text-gray-500">{todo.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            className="text-base text-white cursor-pointer bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
            onClick={updateTodos}
          >
            Edit
          </button>
          <button
            className="text-base text-white cursor-pointer bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <TodoModal
        type="update"
        todo={todo}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default TodoItem;

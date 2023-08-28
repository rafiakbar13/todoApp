import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlices";
import { v4 as uuid } from "uuid";
const TodoModal = ({ type, onClose, isOpen, todo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("incomplete");
    }
  }, [type, todo]);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" && description === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (title && description && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            description,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added Successfully");
        onClose();
      }
      if (type === "update") {
        if (
          todo.title !== title ||
          todo.description !== description ||
          todo.status !== status
        ) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              description,
              status,
              time: new Date().toLocaleString(),
            })
          );
          toast.success("Task Updated Successfully");
          onClose();
        } else {
          toast.error("No changes made");
        }
      }
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed inset-0 z-10 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative z-20 w-1/2 bg-white rounded-lg h-3/4">
        <div className="absolute top-0 right-0 p-2">
          <button
            className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              className="w-4 h-4 text-gray-600"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.778 3.222a.75.75 0 010 1.061L9.06 8l4.718 4.718a.75.75 0 11-1.06 1.06L8 9.06l-4.718 4.72a.75.75 0 11-1.06-1.06L6.94 8 2.222 3.282a.75.75 0 111.06-1.06L8 6.94l4.718-4.72a.75.75 0 011.06 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex-grow p-4">
            <h2 className="mb-4 text-xl font-bold">
              {type === "update" ? "Update" : "Add"} Task
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="w-full h-24 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="status"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </div>
            </form>
          </div>
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-sm font-bold text-white bg-gray-500 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded hover:bg-orange-400 focus:outline-none focus:bg-orange-400"
                type="button"
                onClick={handleSubmit}
              >
                {type === "update" ? "Update" : "Add"} Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TodoModal;

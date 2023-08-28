import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { SelectButton } from "./Button";
import TodoModal from "./TodoModal";
import { updateFilterStatus } from "../slices/todoSlices";
const header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();
  const openModal = () => {
    setIsOpen((prev) => !prev);
  };
  const closeModal = () => {
    setIsOpen((prev) => !prev);
  };

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };
  return (
    <div className="flex items-center justify-between py-7">
      <Button onClick={openModal}>Add Task</Button>
      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="All">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <TodoModal type="add" isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default header;

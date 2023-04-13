import React, { useState } from "react";

const Overview = (props) => {
  const { tasks, onDeleteTask, onUpdateTask } = props;
  const [deleteNumber, setDeleteNumber] = useState("");
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editableTaskText, setEditableTaskText] = useState("");

  const handleDeleteNumberChange = (e) => {
    setDeleteNumber(e.target.value);
  };

  const handleDeleteNumberSubmit = (e) => {
    e.preventDefault();
    onDeleteTask(parseInt(deleteNumber));
    setDeleteNumber("");
  };

  const handleEditTask = (taskId, taskText) => {
    setEditableTaskId(taskId);
    setEditableTaskText(taskText);
  };

  const handleCancelEdit = () => {
    setEditableTaskId(null);
    setEditableTaskText("");
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    onUpdateTask(editableTaskId, editableTaskText);
    setEditableTaskId(null);
    setEditableTaskText("");
  };

  return (
    <div>
      <form onSubmit={handleDeleteNumberSubmit}>
        <label htmlFor="deleteNumberInput">Enter task number to delete:</label>
        <input
          type="number"
          id="deleteNumberInput"
          value={deleteNumber}
          onChange={handleDeleteNumberChange}
        />
        <button type="submit">Delete</button>
      </form>
      <ul>
        {tasks.map((task) => {
          if (editableTaskId === task.id) {
            return (
              <li key={task.id}>
                <form onSubmit={handleUpdateTask}>
                  <input
                    type="text"
                    value={editableTaskText}
                    onChange={(e) => setEditableTaskText(e.target.value)}
                  />
                  <button type="submit">Submit</button>
                  <button type="button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </form>
              </li>
            );
          } else {
            return (
              <li key={task.id}>
                {task.number}. {task.text}{" "}
                <button type="button" onClick={() => handleEditTask(task.id, task.text)}>
                  Edit
                </button>{" "}
                <button type="button" onClick={() => onDeleteTask(task.number)}>
                  Delete
                </button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Overview;

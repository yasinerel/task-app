// Overview.js
import React, { useState } from "react";

const Overview = (props) => {
  const { tasks, onDeleteTask } = props;
  const [deleteNumber, setDeleteNumber] = useState("");

  const handleDeleteNumberChange = (e) => {
    setDeleteNumber(e.target.value);
  };

  const handleDeleteNumberSubmit = (e) => {
    e.preventDefault();
    onDeleteTask(parseInt(deleteNumber));
    setDeleteNumber("");
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
          return (
            <li key={task.id}>
              {task.number}. {task.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Overview;
// App.js

import React, { Component } from "react";
import Overview from "./components/Overview";
import uniqid from "uniqid";

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: {
        text: "",
        id: uniqid(),
      },
      tasks: [],
      taskCount: 0,
    };
  }

  handleChange = (e) => {
    this.setState({
      task: {
        text: e.target.value,
        id: this.state.task.id,
      },
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    const { task, tasks, taskCount } = this.state;
    this.setState({
      tasks: tasks.concat({
        ...task,
        number: taskCount + 1,
      }),
      task: {
        text: "",
        id: uniqid(),
      },
      taskCount: taskCount + 1,
    });
  };

  onDeleteTask = (number) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((task) => task.number !== number);
  
    // Reassign the `number` property of each task
    for (let i = 0; i < updatedTasks.length; i++) {
      updatedTasks[i].number = i + 1;
    }
  
    this.setState({
      tasks: updatedTasks,
    });
  };
  

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input
            onChange={this.handleChange}
            value={task.text}
            type="text"
            id="taskInput"
          />
          <button type="submit">Add Task</button>
        </form>
        <Overview tasks={tasks} onDeleteTask={this.onDeleteTask} />
      </div>
    );
  }
}

export default App;
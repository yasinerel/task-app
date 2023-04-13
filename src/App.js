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
      isEditing: false,
      editTaskId: "",
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
    this.setState({
      tasks: updatedTasks,
    });
  };

  onEditTask = (id) => {
    this.setState({
      isEditing: true,
      editTaskId: id,
    });
  };
  onUpdateTask = (id, newText) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          text: newText
        };
      } else {
        return task;
      }
    });
    this.setState({
      tasks: updatedTasks
    });
  };
  
  
  render() {
    const { task, tasks, isEditing, editTaskId } = this.state;

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
          <button type="submit">{isEditing ? "Update" : "Add Task"}</button>
        </form>
        <Overview
          tasks={tasks}
          onDeleteTask={this.onDeleteTask}
          onEditTask={this.onEditTask}
          onUpdateTask={this.onUpdateTask}
          isEditing={isEditing}
          editTaskId={editTaskId}
        />
      </div>
    );
  }
}

export default App;
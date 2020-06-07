import React, { useState } from "react";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => 
      <Todo key={task.id} 
        id={task.id} 
        name={task.name} 
        toogleTaskCompleted={toogleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        completed={task.completed} />
    );

  const filterLIst = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      isPressed={name === filter}
      setFilter={setFilter}
      name={name} />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = { id: "todo-"+nanoid(), name: name, completed: false };
    setTasks([ ...tasks, newTask ]);
  }

  function toogleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // check id
      if (id === task.id){
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTask = tasks.map(task => {
      if (id === task.id){
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTask);
  }

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterLIst}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;

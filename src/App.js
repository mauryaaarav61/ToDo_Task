import React, { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Math.random() }]);
  };

  const deleteToDo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    const toggledTask = todos.find((todo) => todo.id === id);

    if (toggledTask.completed) {
      setCompletedTasks([...completedTasks, toggledTask]);
    } else {
      setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    }
  };

  const filterTodos = (status) => {
    setFilter(status);
  };

  const moveTask = (fromIndex, toIndex, isCompleted) => {
    const sourceList = isCompleted
      ? completedTasks
      : todos.filter((todo) => !todo.completed);

    const destinationList = isCompleted ? setCompletedTasks : setTodos;

    const updatedList = isCompleted ? [...completedTasks] : [...todos];

    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);

    const updatedTasks = isCompleted
      ? updatedList.map((task) => (task.completed ? task : sourceList.shift()))
      : updatedList.map((task) =>
          !task.completed ? task : sourceList.shift()
        );

    destinationList(updatedTasks);
  };

  const filteredTodos =
    filter === "completed"
      ? completedTasks
      : filter === "incomplete"
      ? todos.filter((todo) => !todo.completed)
      : todos;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>ToDo App</h1>
        <ToDoForm onAdd={addTodo} />
        <div className="todo-list-container">
          <h2>Task List</h2>
          <ToDoList
            todos={filteredTodos.filter((todo) => !todo.completed)}
            onDelete={deleteToDo}
            onToggle={toggleTodo}
            moveTask={(from, to) => moveTask(from, to, false)}
          />
        </div>
        <div
          className="completed-tasks-container"
          onDrop={() =>
            moveTask(
              null,
              completedTasks.filter((todo) => todo.completed).length,
              true
            )
          }
          onDragOver={(e) => e.preventDefault()}
        >
          <h2>Completed Tasks</h2>
          <ToDoList
            todos={filteredTodos.filter((todo) => todo.completed)}
            onDelete={deleteToDo}
            onToggle={toggleTodo}
            moveTask={(from, to) => moveTask(from, to, true)}
          />
        </div>
      </div>
    </DndProvider>
  );
};
export default App;

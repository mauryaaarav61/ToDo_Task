// ToDo.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./todo.css";

const DraggableToDo = ({
  todo,
  index,
  onDelete,
  onToggle,
  moveTask,
  isCompleted,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: { index, isCompleted },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TODO",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index, draggedItem.isCompleted);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`todo ${todo.completed ? "completed" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="todo-activity-date">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <h3
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
        </h3>
      </div>
      <p>{todo.date}</p>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default DraggableToDo;

import React from 'react';
import DraggableToDo from './DraggableToDo';

const ToDoList = ({ todos, onDelete, onToggle, moveTask, isCompleted }) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <DraggableToDo
          key={todo.id}
          todo={todo}
          index={index}
          onDelete={onDelete}
          onToggle={onToggle}
          moveTask={moveTask}
          isCompleted={isCompleted} 
        />
      ))}
    </div>
  );
};

export default ToDoList;

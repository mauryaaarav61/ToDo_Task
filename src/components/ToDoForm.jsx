import React, { useState } from 'react';
import './ToDoForm.css';

const ToDoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    onAdd({ text, date: new Date().toLocaleDateString(), completed: false });
    setText('');
  };

  return (
    <form onSubmit={onSubmit} className="todo-form">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add ToDo" />
      <button type="submit">Add </button>
    </form>
  );
};

export default ToDoForm;

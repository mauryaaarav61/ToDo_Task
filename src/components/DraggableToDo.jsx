import React from 'react';
import ToDo from './ToDo';
import { useDrag } from 'react-dnd';

const DraggableToDo = ({ todo, index, onDelete, onToggle, moveTask, isCompleted }) => {
  const [, drag] = useDrag({
    type: 'TODO',
    item: { index },
  });

  return (
    <div ref={(node) => drag(node)}>
      <ToDo todo={todo} onDelete={onDelete} onToggle={onToggle} moveTask={moveTask} isCompleted={isCompleted} />
    </div>
  );
};

export default DraggableToDo;

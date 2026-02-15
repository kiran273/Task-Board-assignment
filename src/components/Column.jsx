import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import './Column.css';

const Column = ({ id, title, color, tasks, onEditTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      className={`column ${isOver ? 'column-over' : ''}`}
      ref={setNodeRef}
    >
      <div className="column-header" style={{ '--column-color': color }}>
        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="column-content">
        {tasks.length === 0 ? (
          <div className="empty-column">
            <p>No tasks yet</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;

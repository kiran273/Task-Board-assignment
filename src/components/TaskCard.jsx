import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useTasks } from '../contexts/TaskContext';
import { format } from 'date-fns';
import { Calendar, Tag, Trash2, GripVertical } from 'lucide-react';
import './TaskCard.css';

const PRIORITY_COLORS = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444'
};

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask } = useTasks();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      onClick={onEdit}
    >
      <div className="task-drag-handle" {...listeners} {...attributes}>
        <GripVertical size={16} />
      </div>

      <div className="task-content">
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <div 
            className="task-priority"
            style={{ '--priority-color': PRIORITY_COLORS[task.priority] }}
          >
            {task.priority}
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          {task.dueDate && (
            <div className="task-due-date">
              <Calendar size={14} />
              <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}

          {task.tags && task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="task-tag">
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
              {task.tags.length > 2 && (
                <span className="task-tag-more">+{task.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>

      <button 
        className="task-delete"
        onClick={handleDelete}
        title="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TaskCard;

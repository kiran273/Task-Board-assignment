import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import Header from '../components/Header';
import Column from '../components/Column';
import TaskModal from '../components/TaskModal';
import ActivityLog from '../components/ActivityLog';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import './Board.css';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#6366f1' },
  { id: 'doing', title: 'Doing', color: '#f59e0b' },
  { id: 'done', title: 'Done', color: '#10b981' }
];

const Board = () => {
  const { user } = useAuth();
  const { tasks, updateTask } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [showActivityLog, setShowActivityLog] = useState(false);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'dueDate') {
        // Handle tasks without due dates (put them last)
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  }, [tasks, searchQuery, priorityFilter, sortBy]);

  // Group tasks by column
  const tasksByColumn = useMemo(() => {
    return COLUMNS.reduce((acc, column) => {
      acc[column.id] = filteredTasks.filter(task => task.status === column.id);
      return acc;
    }, {});
  }, [filteredTasks]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const taskId = active.id;
    const newStatus = over.id;

    // Update task status if dropped on a column
    if (COLUMNS.find(col => col.id === newStatus)) {
      updateTask(taskId, { status: newStatus });
    }

    setActiveId(null);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const activeTask = activeId ? tasks.find(t => t.id === activeId) : null;

  return (
    <div className="board-page">
      <Header
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onCreateTask={handleCreateTask}
        onToggleActivityLog={() => setShowActivityLog(!showActivityLog)}
      />

      <div className="board-container">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="columns-wrapper">
            {COLUMNS.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Column
                  id={column.id}
                  title={column.title}
                  color={column.color}
                  tasks={tasksByColumn[column.id]}
                  onEditTask={handleEditTask}
                />
              </motion.div>
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <div className="drag-overlay-task">
                <div className="task-card dragging">
                  <h4>{activeTask.title}</h4>
                </div>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {showActivityLog && (
        <ActivityLog onClose={() => setShowActivityLog(false)} />
      )}
    </div>
  );
};

export default Board;

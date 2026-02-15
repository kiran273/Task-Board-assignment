import React, { useState, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import './TaskModal.css';

const TaskModal = ({ task, onClose }) => {
  const { createTask, updateTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        tags: task.tags ? task.tags.join(', ') : ''
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || null,
      tags: formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : []
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      createTask(taskData);
    }

    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="task-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="modal-header">
            <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="title">
                Title <span className="required">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter task title"
                className={errors.title ? 'error' : ''}
                autoFocus
              />
              {errors.title && (
                <div className="field-error">
                  <AlertCircle size={14} />
                  {errors.title}
                </div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Add a description..."
                rows={4}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && (
                <div className="field-error">
                  <AlertCircle size={14} />
                  {errors.description}
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="Separate tags with commas"
              />
              <small className="field-hint">
                e.g., design, urgent, frontend
              </small>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit"
              >
                {task ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;

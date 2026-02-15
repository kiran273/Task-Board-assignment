import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TaskContext = createContext(null);

const STORAGE_KEY = 'taskboard_data';

const initialData = {
  tasks: [],
  activities: []
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setTasks(data.tasks || []);
        setActivities(data.activities || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, activities }));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  }, [tasks, activities, loading]);

  const addActivity = useCallback((type, taskTitle) => {
    const activity = {
      id: Date.now().toString(),
      type,
      taskTitle,
      timestamp: new Date().toISOString()
    };
    
    setActivities(prev => [activity, ...prev].slice(0, 50)); // Keep last 50 activities
  }, []);

  const createTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      status: 'todo',
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [...prev, newTask]);
    addActivity('created', newTask.title);
    return newTask;
  }, [addActivity]);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      if (!task) return prev;
      
      const updated = prev.map(t => t.id === id ? { ...t, ...updates } : t);
      
      // Track activity based on what changed
      if (updates.status && updates.status !== task.status) {
        addActivity('moved', task.title);
      } else {
        addActivity('edited', task.title);
      }
      
      return updated;
    });
  }, [addActivity]);

  const deleteTask = useCallback((id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTasks(prev => prev.filter(t => t.id !== id));
      addActivity('deleted', task.title);
    }
  }, [tasks, addActivity]);

  const resetBoard = useCallback(() => {
    setTasks([]);
    setActivities([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activities,
        createTask,
        updateTask,
        deleteTask,
        resetBoard,
        loading
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

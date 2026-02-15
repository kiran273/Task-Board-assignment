import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { TaskProvider, useTasks } from '../contexts/TaskContext';
import { useEffect } from 'react';

describe('Data Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should persist tasks to localStorage', async () => {
    const TestComponent = () => {
      const { createTask, tasks } = useTasks();

      useEffect(() => {
        if (tasks.length === 0) {
          createTask({
            title: 'Persistent Task',
            description: 'This should persist',
            priority: 'medium'
          });
        }
      }, []);

      return <div>{tasks.length} tasks</div>;
    };

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await waitFor(() => {
      const saved = localStorage.getItem('taskboard_data');
      expect(saved).toBeTruthy();
      const data = JSON.parse(saved);
      expect(data.tasks).toHaveLength(1);
      expect(data.tasks[0].title).toBe('Persistent Task');
    });
  });

  it('should load tasks from localStorage on mount', async () => {
    const initialData = {
      tasks: [
        {
          id: '1',
          title: 'Loaded Task',
          description: 'From storage',
          priority: 'low',
          status: 'todo',
          createdAt: new Date().toISOString()
        }
      ],
      activities: []
    };

    localStorage.setItem('taskboard_data', JSON.stringify(initialData));

    const TestComponent = () => {
      const { tasks } = useTasks();
      return <div>{tasks.length} tasks loaded</div>;
    };

    const { getByText } = render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await waitFor(() => {
      expect(getByText('1 tasks loaded')).toBeInTheDocument();
    });
  });
});

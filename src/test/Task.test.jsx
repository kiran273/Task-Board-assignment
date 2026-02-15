import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskProvider } from '../contexts/TaskContext';
import TaskModal from '../components/TaskModal';

describe('Task Management', () => {
  const mockOnClose = () => {};

  const renderTaskModal = (task = null) => {
    return render(
      <TaskProvider>
        <TaskModal task={task} onClose={mockOnClose} />
      </TaskProvider>
    );
  };

  it('should render create task modal', () => {
    renderTaskModal();
    expect(screen.getByText(/create new task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
  });

  it('should validate required title field', () => {
    renderTaskModal();
    
    const submitButton = screen.getByRole('button', { name: /create task/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
  });

  it('should populate form when editing task', () => {
    const testTask = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      priority: 'high',
      status: 'todo'
    };

    renderTaskModal(testTask);
    
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('high')).toBeInTheDocument();
  });
});

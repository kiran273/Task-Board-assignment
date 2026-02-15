import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import { 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  SortDesc, 
  Activity,
  RotateCcw,
  X
} from 'lucide-react';
import './Header.css';

const Header = ({ 
  user, 
  searchQuery, 
  onSearchChange, 
  priorityFilter, 
  onPriorityFilterChange,
  sortBy,
  onSortChange,
  onCreateTask,
  onToggleActivityLog
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { resetBoard } = useTasks();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReset = () => {
    resetBoard();
    setShowResetConfirm(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-icon-small">
              <div className="logo-grid-small">
                <div className="logo-cell-small"></div>
                <div className="logo-cell-small"></div>
                <div className="logo-cell-small"></div>
                <div className="logo-cell-small"></div>
              </div>
            </div>
            <h1>Task Board</h1>
          </div>

          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => onSearchChange('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="header-right">
          <button 
            className="icon-button"
            onClick={() => setShowFilters(!showFilters)}
            title="Filters & Sort"
          >
            <Filter size={20} />
          </button>

          <button 
            className="icon-button"
            onClick={onToggleActivityLog}
            title="Activity Log"
          >
            <Activity size={20} />
          </button>

          <button 
            className="icon-button"
            onClick={() => setShowResetConfirm(true)}
            title="Reset Board"
          >
            <RotateCcw size={20} />
          </button>

          <button className="create-task-btn" onClick={onCreateTask}>
            <Plus size={20} />
            <span>New Task</span>
          </button>

          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <span className="user-email">{user.email}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>
              <Filter size={16} />
              Priority
            </label>
            <select 
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="filter-group">
            <label>
              <SortDesc size={16} />
              Sort By
            </label>
            <select 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="createdAt">Created Date</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Reset Board?</h3>
            <p>This will delete all tasks and activity history. This action cannot be undone.</p>
            <div className="dialog-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-danger"
                onClick={handleReset}
              >
                Reset Board
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

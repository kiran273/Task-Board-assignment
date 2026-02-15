import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { X, Plus, Edit, Trash2, ArrowRight, Activity } from 'lucide-react';
import './ActivityLog.css';

const ACTIVITY_ICONS = {
  created: Plus,
  edited: Edit,
  deleted: Trash2,
  moved: ArrowRight
};

const ACTIVITY_COLORS = {
  created: '#10b981',
  edited: '#f59e0b',
  deleted: '#ef4444',
  moved: '#6366f1'
};

const ActivityLog = ({ onClose }) => {
  const { activities } = useTasks();

  const getActivityText = (activity) => {
    const actions = {
      created: 'created',
      edited: 'updated',
      deleted: 'deleted',
      moved: 'moved'
    };

    return (
      <>
        <strong>{actions[activity.type]}</strong> task "{activity.taskTitle}"
      </>
    );
  };

  return (
    <motion.div
      className="activity-log-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="activity-log"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="activity-header">
          <div className="activity-title">
            <Activity size={24} />
            <h2>Activity Log</h2>
          </div>
          <button className="activity-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="activity-content">
          {activities.length === 0 ? (
            <div className="activity-empty">
              <Activity size={48} />
              <p>No activity yet</p>
              <small>Actions on your tasks will appear here</small>
            </div>
          ) : (
            <div className="activity-list">
              {activities.map((activity) => {
                const Icon = ACTIVITY_ICONS[activity.type];
                const color = ACTIVITY_COLORS[activity.type];

                return (
                  <motion.div
                    key={activity.id}
                    className="activity-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="activity-icon" style={{ '--activity-color': color }}>
                      <Icon size={16} />
                    </div>
                    <div className="activity-details">
                      <p className="activity-text">
                        {getActivityText(activity)}
                      </p>
                      <time className="activity-time">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </time>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActivityLog;

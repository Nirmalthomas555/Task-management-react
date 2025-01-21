import React from 'react';
import { Task } from '../context/TaskContext';

interface TaskCardProps {
  task: Task;
  onMarkComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onMarkComplete, onDelete }) => (
  <div className="task-card">
    <h3>{task.title}</h3>
    <p>{task.description || 'No description provided.'}</p>
    <span>Status: {task.status}</span>
    <span>Priority: {task.priority}</span>
    {task.status === 'Pending' && (
      <button onClick={() => onMarkComplete(task.id)}>Mark as Completed</button>
    )}
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </div>
);

export default TaskCard;

import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskForm.css'; 

const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: 'Pending',
      priority,
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setPriority('Low');
    alert('Task added successfully');
  };

  return (
    <div className="form-container">
  <form onSubmit={handleSubmit} className="task-form">
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Task Title"
      required
      className="task-input"
    />
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Task Description"
      className="task-textarea"
    />
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
      className="task-select"
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <button type="submit" className="task-button">Add Task</button>
  </form>
</div>

  );
};

export default TaskForm;

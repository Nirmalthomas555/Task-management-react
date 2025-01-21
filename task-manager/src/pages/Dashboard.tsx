import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { fetchTasks } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import Filter from '../components/Filter';

const Dashboard: React.FC = () => {
  const { tasks, updateTaskStatus, deleteTask, setLoading } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      const fetchedTasks = await fetchTasks();
      setLoading(false);
      fetchedTasks.forEach((task) => (task.status = task.completed ? 'Completed' : 'Pending'));
      setFilteredTasks(fetchedTasks);
    };
    loadTasks();
  }, [setLoading]);

  useEffect(() => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (statusFilter) {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    setFilteredTasks(filtered);
  }, [tasks, searchQuery, statusFilter]);

  return (
    <div>
      <Filter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMarkComplete={updateTaskStatus}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

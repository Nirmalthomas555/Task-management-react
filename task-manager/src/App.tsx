import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import TaskForm from './components/TaskForm';
import './App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="App">
        <h1>Task Manager</h1>
        <TaskForm />
        <Dashboard />
      </div>
    </TaskProvider>
  );
};

export default App;

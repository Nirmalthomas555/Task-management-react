import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const updateTaskStatus = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
  };
  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTaskStatus, deleteTask, loading, setLoading }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

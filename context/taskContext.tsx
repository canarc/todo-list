'use client';
import React from 'react';
import { TaskContextType } from '@/types/taskContextType';
import { Task } from '@/types/taskType';
import { PropsWithChildren, FC, createContext } from 'react';
import { useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';

export const TaskContext = createContext<TaskContextType | null>(null);

const TaskProvider: FC<PropsWithChildren<{ id?: string }>> = ({ children, id }) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = React.useState<Task>();

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      window.history.replaceState({}, '', `/${selectedTask.id}`);
    } else {
      window.history.replaceState({}, '', '/');
    }
  }, [selectedTask]);

  const getTasks = async () => {
    const response = await fetch('http://localhost:3000/api/task/').then((res) => res.json());
    if (response?.status === 200) {
      setTasks(response?.data);

      if (id) {
        setSelectedTask(response?.data.find((task: Task) => task.id === id));
      }
    }
  };

  const deleteTask = (task: Task) => {
    if (selectedTask?.id === task.id) {
      setSelectedTask(undefined);
    }

    setTasks((prevTasks) => prevTasks.filter((_task) => _task.id !== task.id));
  };

  const updateTask = (task: Task) => {
    setTasks((prevTasks) => prevTasks.map((_task) => (_task.id === task.id ? task : _task)));
  };

  const createNewTask = () => {
    const id = uuidv1();
    const task = { id, task: '', isCompleted: false, updatedAt: Date.now() };
    setTasks((prevTasks) => [...prevTasks, task]);
    setSelectedTask(task);
  };

  return <TaskContext.Provider value={{ tasks, updateTask, selectedTask, setSelectedTask, createNewTask, deleteTask }}>{children}</TaskContext.Provider>;
};

export default TaskProvider;

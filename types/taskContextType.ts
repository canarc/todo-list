import { Dispatch, SetStateAction } from 'react';
import { Task } from './taskType';

export type TaskContextType = {
  tasks: Task[];
  updateTask: (task: Task) => void;
  selectedTask?: Task;
  setSelectedTask: Dispatch<SetStateAction<Task | undefined>>;
  createNewTask: () => void;
  deleteTask: (task: Task) => void;
};

import { TaskContext } from '@/context/taskContext';
import { TaskContextType } from '@/types/taskContextType';
import { Task } from '@/types/taskType';
import moment from 'moment';
import React from 'react';
import { useContext } from 'react';
import CheckBox from '../checkbox';
import styles from './styles.module.scss';
import { IoTrash } from 'react-icons/io5';
import { MouseEvent } from 'react';
import { ChangeEvent } from 'react';

type TaskProps = {
  task: Task;
  selectedTaskId?: string;
};

const Task: React.FC<TaskProps> = ({ task: { task: content, id, isCompleted, updatedAt }, task }) => {
  const { setSelectedTask, selectedTask, deleteTask, updateTask } = useContext(TaskContext) as TaskContextType;

  const onClick = () => {
    if (window.history.replaceState) {
      window.history.replaceState({}, '', `/${id}`);
    }

    setSelectedTask(task);
  };

  const onDelete = async (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const resp = await fetch(`/api/task/${id}`, { method: 'DELETE' }).then((res) => res.json());
    if (resp.status === 200) {
      deleteTask(task);
    }
  };

  const onCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const _selectedTask = { ...selectedTask!, isCompleted: !selectedTask?.isCompleted };

    if (_selectedTask.id === id) {
      setSelectedTask(_selectedTask);
      return;
    }

    const resp = await fetch(`/api/task/${id}`, { method: 'POST', body: JSON.stringify(_selectedTask) }).then((res) => res.json());

    if (resp.status === 201) {
      updateTask(_selectedTask);
    }
  };
  return (
    <div id={'taskcontainer' + id} className={`${styles.container} ${id === selectedTask?.id && styles.selected}`} onClick={onClick}>
      <CheckBox id={id} onChange={onCheck} checked={isCompleted} style={{ marginRight: '8px' }} />
      <div className={styles.rightSubContainer}>
        <h2>{content || 'Empty Task'}</h2>
        <h3>Updated at: {moment(updatedAt).fromNow()} </h3>
      </div>
      <IoTrash onClick={onDelete} cursor="pointer" size={28} color="var(--main-color)" style={{ marginRight: '8px' }} />
    </div>
  );
};
export default Task;

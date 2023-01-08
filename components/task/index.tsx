import { TaskContext } from '@/context/taskContext';
import { TaskContextType } from '@/types/taskContextType';
import { Task } from '@/types/taskType';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useContext } from 'react';
import CheckBox from '../checkbox';
import styles from './styles.module.scss';
import { IoTrash } from 'react-icons/io5';
import { MouseEventHandler, ReactSVGElement } from 'react';
import { MouseEvent } from 'react';

type TaskProps = {
  task: Task;
  selectedTaskId?: string;
};

const Task: React.FC<TaskProps> = ({ task: { task: content, id, isCompleted, updatedAt }, task }) => {
  const { setSelectedTask, selectedTask, deleteTask } = useContext(TaskContext) as TaskContextType;

  const onClick = () => {
    if (window.history.replaceState) {
      window.history.replaceState({}, '', `/${id}`);
    }

    setSelectedTask(task);
  };

  const onDelete = async (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    const resp = await fetch(`/api/task/${id}`, { method: 'DELETE' }).then((res) => res.json());
    if (resp.status === 200) {
      deleteTask(task);
    }
  };

  return (
    <div id={'taskcontainer' + id} className={`${styles.container} ${id === selectedTask?.id && styles.selected}`} onClick={onClick}>
      <CheckBox id={id} /* checked={isCompleted}  */ style={{ marginRight: '8px' }} />
      <div className={styles.rightSubContainer}>
        <h2>{content || 'Empty Task'}</h2>
        <h3>Updated at: {moment(updatedAt).fromNow()} </h3>
      </div>
      <IoTrash onClick={onDelete} cursor="pointer" size={28} color="var(--main-color)" style={{ marginRight: '8px' }} />
    </div>
  );
};
export default Task;

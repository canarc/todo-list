'use client';
import Task from '@/components/task';
import TasklistHeader from '@/components/tasklist-header';
import { TaskContext } from '@/context/taskContext';
import { TaskContextType } from '@/types/taskContextType';
import { useContext } from 'react';
import { memo, useState } from 'react';
import styles from './styles.module.scss';
import { usePathname } from 'next/navigation';

function TaskListContainer({ id }: { id?: string }) {
  const [search, setSearch] = useState('');
  const { tasks } = useContext(TaskContext) as TaskContextType;

  return (
    <div className={styles.listContainer}>
      <TasklistHeader onSearch={(keyword) => setSearch(keyword)} />
      {tasks
        .filter(({ task }) => task?.includes(search))
        .map((task) => (
          <Task key={`task-${task.id}`} selectedTaskId={id} task={task} />
        ))}
    </div>
  );
}
export default memo(TaskListContainer);

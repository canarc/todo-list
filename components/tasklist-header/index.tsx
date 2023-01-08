import SearchBar from '../searchbar';
import styles from './styles.module.scss';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useContext } from 'react';
import { TaskContext } from '@/context/taskContext';
import { TaskContextType } from '@/types/taskContextType';

type TasklistHeaderProps = {
  onSearch: (keyword: string) => void;
};

function TasklistHeader({ onSearch }: TasklistHeaderProps) {
  const { createNewTask } = useContext(TaskContext) as TaskContextType;
  return (
    <div className={styles.container}>
      <SearchBar onChange={(e) => onSearch(e.target.value)} />
      <IoAddCircleOutline cursor="pointer" onClick={createNewTask} size="32" />
    </div>
  );
}
export default TasklistHeader;

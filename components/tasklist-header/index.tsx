import SearchBar from '../searchbar';
import styles from './styles.module.scss';
import { IoAddCircleOutline } from 'react-icons/io5';
function TasklistHeader() {
  return (
    <div className={styles.container}>
      <SearchBar />
      <IoAddCircleOutline size="32" />
    </div>
  );
}
export default TasklistHeader;

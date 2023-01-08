import Task from '@/components/task';
import TaskEditor from '@/components/task-editor';
import TasklistHeader from '@/components/tasklist-header';
import styles from './styles.module.scss';
function Home({ id }: any) {
  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <TasklistHeader />
        <Task title="Test deneme 123 naber nasılsın iyimisin fak" updatedAt={Date.now()} isCompleted={false} id="5" />
      </div>
      <div className={styles.editorContainer}>
        <TaskEditor />
      </div>
    </div>
  );
}
export default Home;

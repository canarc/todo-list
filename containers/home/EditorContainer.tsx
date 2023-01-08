import TaskEditor from '@/components/task-editor';
import styles from './styles.module.scss';

type EditorContainerProps = {
  id?: string;
};

function EditorContainer({ id }: EditorContainerProps) {
  return (
    <div className={styles.editorContainer}>
      <TaskEditor />
    </div>
  );
}
export default EditorContainer;

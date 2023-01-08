'use client';
import styles from './styles.module.scss';
import useScreenOrientation from '@/helpers/screenOrientation';
import TaskListContainer from './TaskListContainer';
import EditorContainer from './EditorContainer';
import { useContext } from 'react';
import { TaskContext } from '@/context/taskContext';
import { TaskContextType } from '@/types/taskContextType';

function HomeContainer() {
  const { selectedTask } = (useContext(TaskContext) as TaskContextType) || {};
  const isLandscape = (useScreenOrientation() || '') === 'landscape';

  return (
    <div className={styles.container}>
      {(!selectedTask?.id && !isLandscape) || isLandscape ? <TaskListContainer /> : null}
      {(selectedTask?.id && !isLandscape) || isLandscape ? <EditorContainer /> : null}
    </div>
  );
}
export default HomeContainer;

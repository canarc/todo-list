'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

function TaskEditor() {
  const [task, setTask] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('bitti');
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [task]);

  return <textarea spellCheck={false} className={styles.container} value={task} onChange={(e) => setTask(e.target.value)} />;
}
export default TaskEditor;

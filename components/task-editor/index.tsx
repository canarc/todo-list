'use client';
import wait from '@/helpers/wait';
import { ChangeEvent, useRef } from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { TaskContextType } from '@/types/taskContextType';
import { TaskContext } from '@/context/taskContext';
import useScreenOrientation from '@/helpers/screenOrientation';
import BackButton from '../backButton';

const TaskEditor = () => {
  const isPortrait = useScreenOrientation() === 'portrait';

  const { selectedTask, setSelectedTask, updateTask, createNewTask } = useContext(TaskContext) as TaskContextType;

  const [placeholder, setPlaceholder] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (selectedTask) {
      fetch('/api/task/' + selectedTask.id, { method: 'POST', body: JSON.stringify(selectedTask) })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.status === 201) {
            updateTask(selectedTask);
          }
        });

      const timeout = setTimeout(async () => {
        const resp = await fetch('/api/task/' + selectedTask.id, { method: 'POST', body: JSON.stringify(selectedTask) }).then((res) => res.json());

        if (resp.status === 201) {
          updateTask(selectedTask);
        }
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [selectedTask]);

  useEffect(() => {
    if (!selectedTask && window.location.pathname === '/') {
      changePlaceholder();
    }

    isFirstRender.current = false;
  }, []);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedTask({ ...selectedTask!, task: e.target.value || '' });
  };

  const onFocus = () => {
    if (!selectedTask) {
      createNewTask();
    }
  };

  const changePlaceholder = async () => {
    const sentence = 'Hello, welcome to my demo task management tool. \n \nYou can start to create task by clicking plus button on left above. \nor begin to type your task here \n\nI hope you like it. \n\nGreetings, Yiğitcan';

    for (const word of sentence.split(' ')) {
      await wait(word.length * 50);
      setPlaceholder((prevState) => prevState + word + ' ');
    }
  };

  return (
    <>
      {isPortrait && <BackButton />}
      <textarea placeholder={placeholder} spellCheck={false} className={styles.container} value={selectedTask?.task || ''} onFocus={onFocus} onChange={onChange} />
    </>
  );
};
export default TaskEditor;

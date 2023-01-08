'use client';
import wait from '@/helpers/wait';
import { ChangeEvent, ChangeEventHandler, FC, useRef } from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { v1 as uuidv1 } from 'uuid';
import { useContext } from 'react';
import { TaskContextType } from '@/types/taskContextType';
import { TaskContext } from '@/context/taskContext';
import useScreenOrientation from '@/helpers/screenOrientation';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import BackButton from '../backButton';

const TaskEditor = () => {
  const isPortrait = useScreenOrientation() === 'portrait';

  const router = useRouter();

  const { selectedTask, setSelectedTask, updateTask, createNewTask } = useContext(TaskContext) as TaskContextType;

  console.log(selectedTask);
  const [placeholder, setPlaceholder] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (selectedTask) {
      fetch('http://localhost:3000/api/task/' + selectedTask.id, { method: 'POST', body: JSON.stringify(selectedTask) })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.status === 201) {
            updateTask(selectedTask);
          }
        });

      const timeout = setTimeout(async () => {
        const resp = await fetch('http://localhost:3000/api/task/' + selectedTask.id, { method: 'POST', body: JSON.stringify(selectedTask) }).then((res) => res.json());

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

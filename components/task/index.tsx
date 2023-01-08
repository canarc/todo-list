import moment from 'moment';
import React from 'react';
import CheckBox from '../checkbox';
import styles from './styles.module.scss';

type TaskProps = {
  title: string;
  id: string;
  isCompleted: boolean;
  updatedAt: number;
};

const Task: React.FC<TaskProps> = ({ title, id, isCompleted, updatedAt }) => {
  return (
    <div className={styles.container}>
      <CheckBox /* checked={isCompleted}  */ style={{ marginRight: '8px' }} />

      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <h2>{title}</h2>
        <h3>Updated at: {moment(updatedAt).format('hh')} </h3>
      </div>
    </div>
  );
};
export default Task;

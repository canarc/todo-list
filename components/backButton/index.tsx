import { TaskContext } from '@/context/taskContext';
import { TaskContextType } from '@/types/taskContextType';
import { useContext } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

function BackButton() {
  const { setSelectedTask } = useContext(TaskContext) as TaskContextType;

  const onBack = () => {
    setSelectedTask(undefined);
  };
  return <IoArrowBackCircleOutline onClick={onBack} size="36px" color="var(--main-color)" style={{ position: 'fixed', top: 6, right: 12 }} cursor="pointer" />;
}
export default BackButton;

import HomeContainer from '@/containers/home';
import TaskProvider from '@/context/taskContext';
import React from 'react';

type HomePageProps = {
  params: { id?: string[] };
};

const HomePage = async ({ params: { id } }: HomePageProps) => {
  return (
    <>
      <TaskProvider id={id?.[0]}>
        <HomeContainer />
      </TaskProvider>
    </>
  );
};

export default HomePage;

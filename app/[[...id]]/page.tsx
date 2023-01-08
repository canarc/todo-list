import Home from '@/containers/home';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

type HomePageProps = {
  params: { id: string[] };
};

const HomePage: NextPage<HomePageProps> = ({ params }) => {
  return <Home id={params.id?.[0]} />;
};

export default HomePage;

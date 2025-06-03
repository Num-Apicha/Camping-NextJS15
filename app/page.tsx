import LoadingCard from '@/components/card/LoadingCard';
import LandmarkContainer from '@/components/home/LandmarkContainer';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingCard />}>
        <LandmarkContainer />
      </Suspense>
    </>
  );
};
export default HomePage;

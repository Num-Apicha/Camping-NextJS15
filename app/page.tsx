import LoadingCard from '@/components/card/LoadingCard';
import LandmarkContainer from '@/components/home/LandmarkContainer';
import { Suspense } from 'react';

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) => {
  const { search, category } = (await searchParams) || {};

  return (
    <>
      <Suspense fallback={<LoadingCard />}>
        <LandmarkContainer search={search} category={category} />
      </Suspense>
    </>
  );
};
export default HomePage;

import { fetchLandmarkHero, fetchLandmarks } from '@/actions/actions';
import LandmarkList from './LandmarkList';
import { LandmarkCardProps } from '@/utils/types';
import Hero from '../hero/Hero';
import CategoriesList from './CategoriesList';
import EmptyList from './EmptyList';

const LandmarkContainer = async ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const landmarkHero: LandmarkCardProps[] = await fetchLandmarkHero();

  const landmarks: LandmarkCardProps[] = await fetchLandmarks({
    search,
    category,
  });

  return (
    <div>
      <Hero landmarks={landmarkHero} />
      <CategoriesList search={search} category={category} />
      {landmarks.length === 0 ? (
        <EmptyList
          heading="No landmarks found"
          message="Please try a different search or category"
          btnText="Clear filters"
        />
      ) : (
        <LandmarkList landmarks={landmarks} />
      )}
    </div>
  );
};
export default LandmarkContainer;

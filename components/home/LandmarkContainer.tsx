import { fetchLandmarks } from '@/actions/actions';
import LandmarkList from './LandmarkList';
import { LandmarkCardProps } from '@/utils/types';

const LandmarkContainer = async () => {
  const landmarks: LandmarkCardProps[] = await fetchLandmarks();
  // console.log('Landmarks:', landmarks);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Travel with me!</h1>
      <LandmarkList landmarks={landmarks} />
    </div>
  );
};
export default LandmarkContainer;

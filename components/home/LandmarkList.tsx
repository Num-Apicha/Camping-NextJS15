import { LandmarkCardProps } from '@/utils/types';
import LandmarkCard from '../card/LandmarkCard';

const LandmarkList = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
  return (
    <section className="grid sm:grid:cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
      {landmarks.map((landmark) => (
        <LandmarkCard key={landmark.id} Landmark={landmark} />
      ))}
    </section>
  );
};
export default LandmarkList;

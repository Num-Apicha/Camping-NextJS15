import LandmarkCard from '../card/LandmarkCard';

const LandmarkList = ({ landmarks }) => {
  return (
    <div>
      {landmarks.map((landmark, index) => (
        <LandmarkCard key={landmark.id} Landmark={landmark} />
      ))}
    </div>
  );
};
export default LandmarkList;

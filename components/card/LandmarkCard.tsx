import { LandmarkCardProps } from '@/utils/types';
import Image from 'next/image';
import LandmarkRating from './LandmarkRating';
import FavouriteToggleButton from './FavouriteToggleButton';

const LandmarkCard = ({ Landmark }: { Landmark: LandmarkCardProps }) => {
  const { id, name, description, image, price, province, lat, lng, category } =
    Landmark;
  return (
    <article className="group relative mb-4">
      <div className=" relative h-[300px] rounded-md mb-2">
        <Image
          src={image}
          sizes="(max-width: 768px) 100vw, 50vw"
          fill
          alt={name}
          className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <h1 className="text-1xl font-semibold mt-1">
          {name.length > 25 ? name.substring(0, 25) + '...' : name}
        </h1>
        <LandmarkRating />
      </div>

      <p className="text-sm mt-1 text-muted-foreground">
        {description.length > 80
          ? description.substring(0, 80) + '...'
          : description}
      </p>

      <div className="mt-1 flex items-center justify-between font-semibold text-sm">
        <span>THB {price}</span>
        <p>{province}</p>
      </div>

      <div className="absolute top-5 right-5">
        <FavouriteToggleButton landmarkId={id} />
      </div>
    </article>
  );
};
export default LandmarkCard;

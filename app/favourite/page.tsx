import { fetchFavourites } from '@/actions/actions';
import LandmarkList from '@/components/home/LandmarkList';
import { Landmark } from 'lucide-react';

const FavouritePage = async () => {
  const favourites = await fetchFavourites();
  console.log(favourites); // Example usage of fetched data
  return <LandmarkList landmarks={favourites} />;
};
export default FavouritePage;

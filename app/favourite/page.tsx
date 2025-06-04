import { fetchFavourites } from '@/actions/actions';
import EmptyList from '@/components/home/EmptyList';
import LandmarkList from '@/components/home/LandmarkList';

const FavouritePage = async () => {
  const favourites = await fetchFavourites();
  if (favourites.length === 0) {
    return <EmptyList heading="No favourites" />;
  }

  return <LandmarkList landmarks={favourites} />;
};
export default FavouritePage;

import { auth } from '@clerk/nextjs/server';
import { SignInCardButton } from '../form/Buttons';
import { fetchFavouriteId } from '@/actions/actions';
import FavouriteToggleForm from './FavouriteToggleForm';

const FavouriteToggleButton = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const { userId } = await auth();
  if (!userId) return <SignInCardButton />;
  const favouriteId = await fetchFavouriteId({ landmarkId });
  // console.log('Favourite ID:', favouriteId);

  return (
    <FavouriteToggleForm favouriteId={favouriteId} landmarkId={landmarkId} />
  );
};
export default FavouriteToggleButton;

'use client';
import { toggleFavouriteAction } from '@/actions/actions';
import FormContainer from '../form/FormContainer';
import { usePathname } from 'next/navigation';
import { CardSubmitButton } from '../form/Buttons';

const FavouriteToggleForm = ({
  favouriteId,
  landmarkId,
}: {
  favouriteId: string | null;
  landmarkId: string;
}) => {
  const pathname = usePathname();
  // console.log(pathname);
  // console.log('favouriteId', favouriteId, 'landmarkId', landmarkId);

  const toggleAction = toggleFavouriteAction.bind(null, {
    favouriteId,
    landmarkId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavourite={favouriteId ? true : false} />
    </FormContainer>
  );
};
export default FavouriteToggleForm;

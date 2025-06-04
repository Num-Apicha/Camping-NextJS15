import { fetchLandmarkDetail } from '@/actions/actions';
import FavouriteToggleButton from '@/components/card/FavouriteToggleButton';
import Breadcrumbs from '@/components/landmark/Breadcrumbs';
import Description from '@/components/landmark/Description';
import ImageContainer from '@/components/landmark/ImageContainer';
import ShareButton from '@/components/landmark/ShareButton';
import MapLandmark from '@/components/map/MapLandmark';
import { redirect } from 'next/navigation';

const LandmarkDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const landmarkDetail = await fetchLandmarkDetail({ id });
  if (!landmarkDetail) redirect('/');

  return (
    <>
      <section>
        <Breadcrumbs name={landmarkDetail.name} />
        <header className="flex justify-between mt-4 items-center">
          <h1 className="text-4xl font-bold">{landmarkDetail.name}</h1>
          <div className="flex items-center gap-x-4">
            <ShareButton
              landmarkId={landmarkDetail.id}
              name={landmarkDetail.name}
            />
            <FavouriteToggleButton landmarkId={landmarkDetail.id} />
          </div>
        </header>
        <ImageContainer
          mainImage={landmarkDetail.image}
          name={landmarkDetail.name}
        />

        <section>
          <div>
            <Description description={landmarkDetail.description} />
            <MapLandmark
              location={{ lat: landmarkDetail.lat, lng: landmarkDetail.lng }}
            />
          </div>
          <iframe
            src={`http://maps.google.com/maps?q=${landmarkDetail.lat},${landmarkDetail.lng}&z=16&output=embed`}
            height="450"
            width="600"
          ></iframe>
        </section>
      </section>
    </>
  );
};
export default LandmarkDetail;

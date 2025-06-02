import { createLandmarkAction } from '@/actions/actions';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import CategoryInput from '@/components/form/CategoryInput';
import TextareaInput from '@/components/form/TextareaInput';
import ProvinceInput from '@/components/form/ProvinceInput';
import MapLandmark from '@/components/map/MapLandmark';
import ImageInput from '@/components/form/ImageInput';

const CreateLandmark = async () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Create Landmark
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createLandmarkAction}>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-2">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="Landmark Name"
            />

            <CategoryInput
              name="category"
              label="Category"
              defaultValue=""
              required={true}
            />

            <FormInput
              name="price"
              label="Price"
              type="text"
              placeholder="Price"
            />

            <ProvinceInput
              name="province"
              label="Province"
              defaultValue=""
              required={true}
            />
          </div>

          <TextareaInput
            name="description"
            label="Description"
            defaultValue=""
            rows={5}
            required={false}
          />

          <ImageInput name="image" required={true} />

          {/* location={{ lat: 14, lng: 99 }} */}
          <MapLandmark />

          <SubmitButton text="Create landmark" size="lg" />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateLandmark;

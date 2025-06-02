import Image from 'next/image';

const LandmarkCard = ({ Landmark }) => {
  const { name, image } = Landmark;
  return (
    <article className="group relative mb-4">
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <div className=" relative h-[300px]">
        <Image
          src={image}
          sizes="(max-width: 768px) 100vw, 50vw"
          fill
          alt={name}
          className="object-cover rounded-2xl"
        />
      </div>
    </article>
  );
};
export default LandmarkCard;

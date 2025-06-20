import { Skeleton } from '../ui/skeleton';

const LoadingCard = () => {
  return (
    <>
      <SkeletonCardHero />
      <div className="grid sm:grid:cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </>
  );
};

export const SkeletonCard = () => {
  return (
    <div>
      <Skeleton className="h-[600px] rounded-md mb-2" />
      <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
      <Skeleton className="h-4 w-1/2 rounded-md mb-2" />
      <Skeleton className="h-4 w-1/4 rounded-md" />
    </div>
  );
};

export const SkeletonCardHero = () => {
  return (
    <>
      <Skeleton className="w-full h-[600px]  rounded-md mb-2" />
      <div className="flex flex-col items-center justify-center">
        <Skeleton className="w-[60%] h-[72px] my-4 rounded-md mb-2" />
      </div>
    </>
  );
};

export default LoadingCard;

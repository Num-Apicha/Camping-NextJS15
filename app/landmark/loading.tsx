import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <>
      <Skeleton className="h-12 w-2/4 rounded-md my-2" />
      <Skeleton className="h-[300px] md:h-[500px] w-full rounded-md" />
      <Skeleton className="h-20 w-full rounded-md mt-4" />
      <Skeleton className="h-10 w-3/4 rounded-md mt-4" />
      <Skeleton className="h-5 w-2/4 rounded-md mt-4" />
    </>
  );
};
export default loading;

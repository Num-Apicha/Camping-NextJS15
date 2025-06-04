import { categories } from '@/utils/categories';
import Link from 'next/link';

const CategoriesList = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const searchTerm = search ? `&search=${search}` : '';
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center my-4 font-bold gap-x-4">
        {categories.map((item) => {
          const onActive = category === item.label ? ' text-primary' : '';
          return (
            <Link
              href={`/?category=${item.label}${searchTerm}`}
              key={item.label}
            >
              <article
                className={`flex flex-col justify-center items-center p-3 hover:text-primary hover:scale-105 hover:duration-200 ${onActive}`}
              >
                <item.icon className="h-6 w-6 mr-2" />
                <p>{item.label}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default CategoriesList;

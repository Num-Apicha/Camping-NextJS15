import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/utils/categories';

type CategoryInputProps = {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
};

const CategoryInput = ({
  name,
  label,
  defaultValue,
  required,
}: CategoryInputProps) => {
  const placeholder = '- Select ' + name + ' -';
  return (
    <>
      <div className="mb-2">
        <Label htmlFor={name} className="mb-1">
          {label}
        </Label>
        <Select name={name} defaultValue={defaultValue} required={required}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category.label}>
                <span className="capitalize flex items-center gap-4">
                  <category.icon />
                  {category.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
export default CategoryInput;

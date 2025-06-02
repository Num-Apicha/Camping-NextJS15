import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { provinces } from '@/utils/provinces';

type ProvinceInputProps = {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
};

const ProvinceInput = ({
  name,
  label,
  defaultValue,
  required,
}: ProvinceInputProps) => {
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
            {provinces.map((province, index) => (
              <SelectItem key={index} value={province.PROVINCE_NAME.toString()}>
                {province.PROVINCE_NAME}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
export default ProvinceInput;

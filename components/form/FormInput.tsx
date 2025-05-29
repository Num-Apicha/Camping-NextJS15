import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputProps = {
  name: string;
  type: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
};

const FormInput = ({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
}: FormInputProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="mb-1">
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        value={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
export default FormInput;

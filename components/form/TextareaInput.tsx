import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

type TextareaInputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
};

const TextareaInput = ({
  name,
  label,
  defaultValue,
  rows = 5,
  required,
}: TextareaInputProps) => {
  return (
    <>
      <div className="mb-2">
        <Label htmlFor={name} className="capitalize">
          {label}
        </Label>
        <Textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          rows={rows}
          required={required}
        />
      </div>
    </>
  );
};
export default TextareaInput;

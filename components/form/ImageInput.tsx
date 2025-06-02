import { Label } from '../ui/label';
import { Input } from '../ui/input';

type ImageInputProps = {
  name: string;
  required?: boolean;
};

const ImageInput = ({ name, required }: ImageInputProps) => {
  return (
    <div>
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        required={required}
      ></Input>
    </div>
  );
};
export default ImageInput;

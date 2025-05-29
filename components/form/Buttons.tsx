'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  size?: btnSize;
  text: string;
  className?: string;
};

export const SubmitButton = ({ text, size, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        type="submit"
        size={size}
        className={`${className} capitalize`}
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader className="animate-spin" />
            <span>Please wait...</span>
          </>
        ) : (
          text
        )}
      </Button>
    </>
  );
};

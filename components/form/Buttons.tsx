'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Heart, Loader, RotateCw } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';

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

export const SignInCardButton = () => {
  return (
    <SignInButton mode="modal">
      <Button size="icon" variant="outline">
        <Heart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavourite }: { isFavourite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" variant="outline" disabled={pending}>
      {pending ? (
        <RotateCw className="animate-spin" />
      ) : isFavourite ? (
        <Heart fill="red" />
      ) : (
        <Heart />
      )}
    </Button>
  );
};

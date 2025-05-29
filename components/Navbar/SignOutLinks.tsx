'use client';
import { SignOutButton } from '@clerk/nextjs';
import { toast } from 'sonner';

const SignOutLinks = () => {
  const handleSignOut = () => {
    toast.success('You have successfully logged out.');
  };
  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left " onClick={handleSignOut}>
        Logout
      </button>
    </SignOutButton>
  );
};
export default SignOutLinks;

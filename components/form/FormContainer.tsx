'use client';
import { actionFunction } from '@/utils/types';
import { useEffect, useActionState } from 'react';
import { toast } from 'sonner';

const initState = { message: '' };

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, initState);

  useEffect(() => {
    if (state.message) {
      toast.info(state.message);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>{children}</form>
    </>
  );
};
export default FormContainer;

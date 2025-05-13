
import { useEffect, useState } from 'react';
import AuthButtons from '@/components/AuthButtons';

export const useAuthButtons = () => {
  const [component, setComponent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    setComponent(<AuthButtons />);
  }, []);

  return component;
};

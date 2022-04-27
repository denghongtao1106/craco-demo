import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteChange = (callback: (hash: string) => void) => {
  const { pathname } = useLocation();
  useEffect(() => {
    callback?.(pathname);
  }, [callback, pathname]);
};

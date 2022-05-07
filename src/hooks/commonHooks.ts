import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteChange = (callback: (hash: string) => void) => {
  const { pathname } = useLocation();
  useEffect(() => {
    callback?.(pathname);
  }, [callback, pathname]);
};

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>({});
  const [failData, setFailData] = useState({});
  const sendRequest = useCallback(
    (requestFn: (params: any) => Promise<any>, params: any) => {
      setLoading(true);
      requestFn(params)
        .then((res) => {
          setSuccessData(res);
        })
        .catch((err) => {
          console.log(err);

          setFailData(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );
  return { loading, successData, failData, sendRequest };
};

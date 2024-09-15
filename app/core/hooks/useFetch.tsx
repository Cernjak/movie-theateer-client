import { useCallback, useMemo, useRef, useState } from 'react';

interface IProps {
  url: string;
}

const useFetch = ({ url }: IProps) => {
  const [status, setStatus] = useState<
    'initial' | 'loading' | 'success' | 'error' | 'fail'
  >('initial');
  const [result, setResult] = useState<any>(null);
  const controller = useRef<AbortController | null>(null);

  const doFetch = useCallback(
    async (options: any) => {
      if (controller.current) controller.current.abort();
      try {
        controller.current = new AbortController();
        setStatus('loading');
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${url}`,
          {
            signal: controller.current?.signal,
            credentials: 'include',
            ...options,
          }
        );
        const data: any = await res.json();

        setResult(data);
        setStatus(data.status);
        return data;
      } catch (error: any) {
        setStatus('error');
        setResult(error.message);
      }
    },
    [url]
  );

  const value = useMemo(
    () => ({
      status,
      result,
      doFetch,
    }),
    [doFetch, result, status]
  );

  return value;
};

export default useFetch;

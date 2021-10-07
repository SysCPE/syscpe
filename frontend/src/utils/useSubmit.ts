import { useEffect, useRef, useState } from 'react';

const LOADING = 'loading';
const DONE = 'done';
const ERROR = 'error';
const SUBMIT = 'submit';

type Status = typeof LOADING | typeof DONE | typeof ERROR | typeof SUBMIT;

const useSubmit = <T>(
  handleSubmit: () => Promise<T>,
  onDone?: (args: T) => void,
  onError?: (error: any) => void
) => {
  const isMounted = useRef<boolean>(false);
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (status !== SUBMIT) return;
    if (!!isMounted.current) setStatus(LOADING);

    const call = async () => {
      try {
        const response = await handleSubmit();

        if (!!isMounted.current) setStatus(DONE);

        onDone?.(response);
      } catch (error) {
        if (!!isMounted.current) setStatus(ERROR);

        onError?.(error);
      }
    };

    call();
  }, [status, handleSubmit, onDone, onError]);

  const submit = () => {
    if (status === LOADING) return;
    if (status === SUBMIT) return;

    setStatus(SUBMIT);
  };

  return {
    submit,
    loading: status === LOADING,
    done: status === DONE,
    failed: status === ERROR,
  };
};

export default useSubmit;

import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import useSubmit from './useSubmit';

describe('useSubmit', () => {
  it('should execute successful flow', async () => {
    const onDone = jest.fn();
    const { result } = renderHook(() => useSubmit(async () => 5, onDone));

    act(() => {
      result.current.submit();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.done).toBe(true);
    });

    expect(onDone).toBeCalledWith(5);
  });

  it('should execute failed flow', async () => {
    const onError = jest.fn();
    const error = new Error();
    const { result } = renderHook(() =>
      useSubmit(
        async () => {
          throw error;
        },
        () => {},
        onError
      )
    );

    act(() => {
      result.current.submit();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.failed).toBe(true);
    });

    expect(onError).toBeCalledWith(error);
  });

  it('should test multiple submit calls', async () => {
    const onDone = jest.fn();
    const { result } = renderHook(() => useSubmit(async () => 5, onDone));

    act(() => {
      result.current.submit();
      result.current.submit();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.done).toBe(true);
    });

    expect(onDone).toBeCalledTimes(1);
  });
});

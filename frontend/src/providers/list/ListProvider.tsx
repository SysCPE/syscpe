import { Context, PropsWithChildren } from 'react';
import ListContextType from './ListContextType';

type Props<T> = {
  context: Context<ListContextType<T>>;
  value: ListContextType<T>;
};
function ListProvider<T>({
  children,
  context,
  value,
}: PropsWithChildren<Props<T>>) {
  const { items, loading, failed, done, retry } = value;

  return (
    <context.Provider value={{ items, loading, failed, done, retry }}>
      {children}
    </context.Provider>
  );
}

export default ListProvider;

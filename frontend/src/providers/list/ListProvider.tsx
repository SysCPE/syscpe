import { Context, PropsWithChildren, useEffect, useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';
import ListContextType from './ListContextType';

type WithID = {
  id: string;
};

type Props<T extends WithID> = {
  context: Context<ListContextType<T>>;
  listItems: () => Promise<T[]>;
};
function ListProvider<T extends WithID>({
  context,
  listItems,
  children,
}: PropsWithChildren<Props<T>>) {
  const [firstLoad, setFirstLoad] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const { done, failed, loading, submit } = useSubmit(
    () => delayed(listItems()),
    (items) => setItems(items)
  );

  useEffect(() => {
    if (firstLoad) return;
    setFirstLoad(true);
    submit();
  }, [submit, firstLoad]);

  const retry = () => {
    if (!failed) return;
    submit();
  };

  const onItemsCreated = (createdItems: T[]) =>
    setItems((items) => createdItems.concat(items));

  const onItemDeleted = (deletedItem: T) =>
    setItems((items) => items.filter((item) => item.id !== deletedItem.id));

  const onItemEdited = (editedItem: T) =>
    setItems((items) =>
      items.map((item) => {
        if (item.id === editedItem.id) return editedItem;
        return item;
      })
    );

  return (
    <context.Provider
      value={{
        done,
        failed,
        items,
        loading,
        retry,
        onItemsCreated,
        onItemDeleted,
        onItemEdited,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default ListProvider;
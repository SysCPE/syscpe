type ListContextType<T> = {
  items: T[];

  loading: boolean;
  failed: boolean;
  done: boolean;

  retry: () => void;

  onItemsCreated: (items: T[]) => void;
  onItemDeleted: (item: T) => void;
  onItemEdited: (item: T) => void;
};

export default ListContextType;

type ListContextType<T> = {
  items: T[];

  loading: boolean;
  failed: boolean;
  done: boolean;

  retry: () => void;
  refresh: () => void;

  onItemsCreated: (items: T[]) => void;
  onItemDeleted: (item: T) => void;
  onItemEdited: (item: T) => void;

  deleteItem: (item: T) => Promise<void>;
  editItem: (item: T) => Promise<void>;
};

export default ListContextType;

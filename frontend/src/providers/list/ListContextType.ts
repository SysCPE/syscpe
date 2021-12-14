type ListContextType<T> = {
  items: T[];

  loading: boolean;
  failed: boolean;
  done: boolean;

  retry: () => void;
};

export default ListContextType;

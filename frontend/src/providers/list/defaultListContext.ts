import ListContextType from './ListContextType';

function defaultListContext<T>(): ListContextType<T> {
  return {
    items: [],

    loading: false,
    failed: false,
    done: false,

    retry: () => {},
    refresh: () => {},

    onItemsCreated: () => {},
    onItemDeleted: () => {},
    onItemEdited: () => {},

    deleteItem: async () => {},
    editItem: async () => {},
  };
}

export default defaultListContext;

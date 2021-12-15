import ListContextType from './ListContextType';

function defaultListContext<T>(): ListContextType<T> {
  return {
    items: [],

    loading: false,
    failed: false,
    done: false,

    retry: () => {},

    onItemsCreated: () => {},
    onItemDeleted: () => {},
    onItemEdited: () => {},

    deleteItem: async () => {},
  };
}

export default defaultListContext;

import { createContext } from 'react';
import ListContextType from './ListContextType';

function createListContext<T>() {
  return createContext<ListContextType<T>>({
    items: [],

    loading: false,
    failed: false,
    done: false,

    retry: () => {},

    onItemsCreated: () => {},
    onItemDeleted: () => {},
    onItemEdited: () => {},

    deleteItem: async () => {},
  });
}

export default createListContext;

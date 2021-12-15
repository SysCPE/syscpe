import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import defaultListContext from 'providers/list/defaultListContext';
import ListContextType from 'providers/list/ListContextType';
import { createContext } from 'react';

const DepartmentsContext = createContext<ListContextType<DepartmentEntity>>({
  ...defaultListContext<DepartmentEntity>(),
});

export default DepartmentsContext;

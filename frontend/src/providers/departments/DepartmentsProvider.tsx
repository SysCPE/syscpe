import listDepartmentsUseCase from 'domain/departments/usecases/list_departments_usecase';
import ListProvider from 'providers/list/ListProvider';
import { FC } from 'react';
import DepartmentsContext from './DepartmentsContext';

const DepartmentsProvider: FC = ({ children }) => {
  return (
    <ListProvider
      context={DepartmentsContext}
      listItems={listDepartmentsUseCase}
    >
      {children}
    </ListProvider>
  );
};

export default DepartmentsProvider;

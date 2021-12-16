import endWorkgroupUseCase from 'domain/workgroup/usecases/end_workgroup_usecase';
import listWorkgroupsUseCase from 'domain/workgroup/usecases/list_workgroups_usecase';
import ListProvider from 'providers/list/ListProvider';
import { FC } from 'react';
import WorkgroupContext from './WorkgroupsContext';

const WorkgroupProvider: FC = ({ children }) => {
  return (
    <ListProvider
      context={WorkgroupContext}
      listItems={listWorkgroupsUseCase}
      deleteItem={endWorkgroupUseCase}
    >
      {children}
    </ListProvider>
  );
};

export default WorkgroupProvider;

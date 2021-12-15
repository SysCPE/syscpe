import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import defaultListContext from 'providers/list/defaultListContext';
import ListContextType from 'providers/list/ListContextType';
import { createContext } from 'react';

const WorkgroupContext = createContext<ListContextType<WorkgroupEntity>>({
  ...defaultListContext<WorkgroupEntity>(),
});

export default WorkgroupContext;

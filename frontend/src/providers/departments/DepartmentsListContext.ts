import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import createListContext from 'providers/list/createListContext';

const DepartmentsListContext = createListContext<DepartmentEntity>();

export default DepartmentsListContext;

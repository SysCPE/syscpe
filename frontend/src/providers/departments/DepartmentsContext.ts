import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import createListContext from 'providers/list/createListContext';

const DepartmentsContext = createListContext<DepartmentEntity>();

export default DepartmentsContext;

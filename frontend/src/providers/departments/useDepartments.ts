import { useContext } from 'react';
import DepartmentsContext from './DepartmentsContext';

const useDepartments = () => {
  return useContext(DepartmentsContext);
};

export default useDepartments;

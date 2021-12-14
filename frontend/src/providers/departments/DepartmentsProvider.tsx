import DepartmentEntity from 'domain/departments/entities/DepartmentEntity';
import listDepartmentsUseCase from 'domain/departments/usecases/list_departments_usecase';
import { FC, useEffect, useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';
import DepartmentsListContext from './DepartmentsListContext';

const DepartmentsProvider: FC = ({ children }) => {
  const [firstLoad, setFirstLoad] = useState(false);
  const [departments, setDepartments] = useState<DepartmentEntity[]>([]);
  const { done, failed, loading, submit } = useSubmit(
    () => delayed(listDepartmentsUseCase()),
    (departments) => setDepartments(departments)
  );

  useEffect(() => {
    if (firstLoad) return;
    setFirstLoad(true);
    submit();
  }, [submit, firstLoad]);

  const retry = () => {
    if (!failed) return;
    submit();
  };

  return (
    <DepartmentsListContext.Provider
      value={{ failed, loading, done, retry, items: departments }}
    >
      {children}
    </DepartmentsListContext.Provider>
  );
};

export default DepartmentsProvider;

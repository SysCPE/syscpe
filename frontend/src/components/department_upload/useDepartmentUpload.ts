import createDepartmentUseCase from 'domain/departments/usecases/create_department_usecase';
import { useSnackbar } from 'notistack';
import DepartmentsContexts from 'providers/departments/DepartmentsContexts';
import { useContext, useMemo, useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';

const useDepartmentUpload = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { onItemsCreated, items } = useContext(
    DepartmentsContexts.withListContext
  );
  const { enqueueSnackbar } = useSnackbar();
  const itemNames = useMemo(() => items.map((item) => item.name), [items]);
  const { loading, submit } = useSubmit(
    async () => delayed(createDepartmentUseCase(name)),
    (deparment) => {
      setName('');
      onItemsCreated([deparment]);
      enqueueSnackbar(`Departamento "${deparment.name}" criado com sucesso`, {
        variant: 'success',
      });
    },
    () =>
      enqueueSnackbar('Houve um erro na hora de criar departamento', {
        variant: 'error',
      })
  );

  const onSubmit = () => {
    setError('');

    const newName = name.trim();

    const isNameEmpty = !newName.trim();
    if (isNameEmpty) {
      setError('Nome de departamento não pode ser vazio');
      return;
    }

    const isNameRepeated = itemNames.includes(newName);
    if (isNameRepeated) {
      setError('Nome de departamento repetido');
      return;
    }

    submit();
  };

  return { name, setName, onSubmit, error, loading };
};

export default useDepartmentUpload;

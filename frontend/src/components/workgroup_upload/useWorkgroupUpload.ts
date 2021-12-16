import createWorkgroupUseCase from 'domain/workgroup/usecases/create_workgroup_usecase';
import { useSnackbar } from 'notistack';
import WorkgroupsContexts from 'providers/workgroups/WorkgroupsContexts';
import { useContext, useMemo, useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';

const useWorkgroupUpload = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState(new Date());
  const [error, setError] = useState('');
  const { onItemsCreated, items } = useContext(
    WorkgroupsContexts.withListContext
  );
  const { enqueueSnackbar } = useSnackbar();
  const itemNames = useMemo(() => items.map((item) => item.name), [items]);
  const { loading, submit } = useSubmit(
    async () =>
      delayed(createWorkgroupUseCase(name, description, creationDate)),
    (workgroup) => {
      setName('');
      setDescription('');
      setCreationDate(new Date());
      onItemsCreated([workgroup]);
      enqueueSnackbar(`GT "${workgroup.name}" criado com sucesso`, {
        variant: 'success',
      });
    },
    () =>
      enqueueSnackbar('Houve um erro na hora de criar GT', {
        variant: 'error',
      })
  );

  const onSubmit = () => {
    setError('');

    const newName = name.trim();

    const isNameEmpty = !newName.trim();
    if (isNameEmpty) {
      setError('Nome de GT não pode ser vazio');
      return;
    }

    const isNameRepeated = itemNames.includes(newName);
    if (isNameRepeated) {
      setError('Nome de GT repetido');
      return;
    }

    submit();
  };

  return {
    name,
    description,
    creationDate,
    setName,
    setDescription,
    setCreationDate,
    onSubmit,
    error,
    loading,
  };
};

export default useWorkgroupUpload;

import uploadUsersCSVUseCase from 'domain/user/usecases/upload_users_csv_usecase';
import { useSnackbar } from 'notistack';
import useMembers from 'providers/members/useMembers';
import { useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';

const useMembersUpload = () => {
  const { onMembersCreated } = useMembers();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);

  const { loading, submit } = useSubmit(
    async () => delayed(uploadUsersCSVUseCase(file!)),
    (usersCreated) => {
      enqueueSnackbar(`${usersCreated.length} membro(s) criado(s)`, {
        variant: 'success',
      });
      onMembersCreated(usersCreated);
      setFile(null);
    },
    (error) => {
      enqueueSnackbar('Ocorreu um erro na hora de adicionar novos membros');
      throw error;
    }
  );

  const uploadFile = () => submit();

  return {
    loading,
    uploadFile,
    file,
    setFile,
  };
};

export default useMembersUpload;

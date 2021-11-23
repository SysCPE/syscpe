import uploadUsersCSVUseCase from 'domain/user/usecases/upload_users_csv_usecase';
import { useState } from 'react';
import useSubmit from 'utils/useSubmit';

const useMembersUpload = () => {
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const [usersCreated, setUsersCreated] = useState<number>();
  const [file, setFile] = useState<File>();

  const { loading, submit } = useSubmit(
    async () => {
      return await uploadUsersCSVUseCase(file!);
    },
    (usersCreated) => {
      setUsersCreated(usersCreated);
      setDone(true);
    },
    (error) => {
      setFailed(true);
      throw error;
    }
  );

  const uploadFile = (fileToUpload: File) => {
    setFile(fileToUpload);
    submit();
  };

  const closeDoneDialog = () => setDone(false);
  const closeFailedDialog = () => setFailed(false);

  return {
    loading,
    uploadFile,
    usersCreated,
    done,
    closeDoneDialog,
    failed,
    closeFailedDialog,
  };
};

export default useMembersUpload;

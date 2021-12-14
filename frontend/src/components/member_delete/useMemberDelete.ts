import MemberEntity from 'domain/members/entities/MemberEntity';
import deleteMemberUseCase from 'domain/members/usecases/delete_member_usecase';
import { useSnackbar } from 'notistack';
import useMembers from 'providers/members/useMembers';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';

const useMemberDelete = (member: MemberEntity) => {
  const { enqueueSnackbar } = useSnackbar();
  const { onItemDeleted } = useMembers();

  const { loading, submit } = useSubmit(
    async () => delayed(deleteMemberUseCase(member)),
    () => {
      enqueueSnackbar('Membro deletado com sucesso', {
        variant: 'success',
      });
      onItemDeleted(member);
    },
    () =>
      enqueueSnackbar('Ocorreu um erro na hora de adicionar novos membros', {
        variant: 'error',
      })
  );

  return { loading, submit };
};

export default useMemberDelete;

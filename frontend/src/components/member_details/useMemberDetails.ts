import MemberEntity from 'domain/members/entities/MemberEntity';
import editMemberUseCase from 'domain/members/usecases/edit_member_usecase';
import { useSnackbar } from 'notistack';
import useMembers from 'providers/members/useMembers';
import { useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';

const useMemberDetails = (initialMember: MemberEntity) => {
  const { onMemberEdited } = useMembers();
  const { enqueueSnackbar } = useSnackbar();
  const [currentMember, setCurrentMember] =
    useState<MemberEntity>(initialMember);
  const { loading, submit } = useSubmit(
    async () => delayed(editMemberUseCase(currentMember)),
    () => {
      enqueueSnackbar('Membro editado com sucesso', { variant: 'success' });
      onMemberEdited(currentMember);
    },
    () =>
      enqueueSnackbar('Houve um erro na hora de editar membro', {
        variant: 'error',
      })
  );

  const hasChanged =
    JSON.stringify(currentMember) !== JSON.stringify(initialMember);

  const saveMember = () => {
    if (!hasChanged) return;
    submit();
  };

  return { currentMember, setCurrentMember, hasChanged, saveMember, loading };
};

export default useMemberDetails;

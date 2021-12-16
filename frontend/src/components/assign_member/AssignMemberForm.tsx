import { DialogContent, DialogTitle, Grid } from '@mui/material';
import LoadingButtonComponent from 'components/LoadingButtonComponent';
import MembersAutocompleteComponent from 'components/members_autocomplete/MembersAutocompleteComponent';
import MemberEntity from 'domain/members/entities/MemberEntity';
import { useSnackbar } from 'notistack';
import WithMemberAssociationContextType from 'providers/with_member_association/WithMemberAssociationContextType';
import { Context, Fragment, useContext, useState } from 'react';
import delayed from 'utils/delayed';
import useSubmit from 'utils/useSubmit';

type Props<T> = {
  title: string;
  item: T;
  context: Context<WithMemberAssociationContextType<T>>;
  failMessage: string;
  successMessage: string;
};
function AssignMemberFormComponent<T>({
  title,
  context,
  item,
  failMessage,
  successMessage,
}: Props<T>) {
  const { associateMember } = useContext(context);
  const { enqueueSnackbar } = useSnackbar();
  const [member, setMember] = useState<MemberEntity | null>(null);
  const { loading, submit } = useSubmit(
    async () => delayed(associateMember(member!, item)),
    () => {
      setMember(null);
      enqueueSnackbar(successMessage, { variant: 'success' });
    },
    () => {
      enqueueSnackbar(failMessage, { variant: 'error' });
    }
  );

  const onSubmit = () => {
    if (!member) return;
    submit();
  };

  return (
    <Fragment>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container direction="column" sx={{ padding: 2 }}>
          <MembersAutocompleteComponent member={member} setMember={setMember} />

          <Grid item sx={{ marginTop: 2 }} alignSelf="flex-end">
            <LoadingButtonComponent
              sx={{ textTransform: 'none' }}
              loading={loading}
              onClick={onSubmit}
            >
              Associar Membro
            </LoadingButtonComponent>
          </Grid>
        </Grid>
      </DialogContent>
    </Fragment>
  );
}

export default AssignMemberFormComponent;

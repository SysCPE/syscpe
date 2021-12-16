import { Typography } from '@mui/material';
import DeleteButtonComponent from 'components/delete_button/DeleteButtonComponent';
import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import WorkgroupContext from 'providers/workgroups/WorkgroupsContext';
import { FC } from 'react';

type Props = {
  workgroup: WorkgroupEntity;
};
const WorkgroupEndComponent: FC<Props> = ({ workgroup }) => {
  return (
    <DeleteButtonComponent
      value={workgroup}
      context={WorkgroupContext}
      warning={
        <Typography variant="body1">
          Clique novamente para <b>encerrar</b> este GT
        </Typography>
      }
      successMessage="GT encerrado com sucesso"
      failMessage={`Ocorreu um erro na hora de encerrar o GT "${workgroup.name}"`}
    />
  );
};

export default WorkgroupEndComponent;

import DetailsComponent from 'components/details/DetailsComponent';
import WorkgroupEditFormComponent from 'components/workgroup_edit_form/WorkgroupEditFormComponent';
import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import WorkgroupsContexts from 'providers/workgroups/WorkgroupsContexts';
import { FC } from 'react';

type Props = {
  workgroup: WorkgroupEntity;
};
const WorkgroupDetailsComponent: FC<Props> = ({ workgroup }) => {
  return (
    <DetailsComponent
      context={WorkgroupsContexts.withListContext}
      item={workgroup}
      failMessage={`Houve um erro na hora de editar o GT ${workgroup.name}`}
      sucessMessage={`GT ${workgroup.name} foi editado com sucesso`}
      Form={WorkgroupEditFormComponent}
    />
  );
};

export default WorkgroupDetailsComponent;

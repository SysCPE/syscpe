import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import WorkgroupData from './workgroup_data';

const mapWorkgroupDataToEntity = (
  workgorup: WorkgroupData
): WorkgroupEntity => {
  return {
    id: workgorup.name,
    name: workgorup.name,
    description: workgorup.description || '',
    creationDate: workgorup.creationDate,
    endDate: workgorup.endDate,
    members: workgorup.members,
  };
};

export default mapWorkgroupDataToEntity;

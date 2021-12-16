import workgroupsService from 'services/workgroup_service';
import WorkgroupEntity from '../entities/WorkgroupEntity';

const endWorkgroupUseCase = async (workgroup: WorkgroupEntity) => {
  await workgroupsService.endWorkgroup(workgroup);
};

export default endWorkgroupUseCase;

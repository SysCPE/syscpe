import workgroupsService from 'services/workgroup_service';
import WorkgroupEntity from '../entities/WorkgroupEntity';

const editWorkgroupUseCase = async (workgroup: WorkgroupEntity) => {
  await workgroupsService.editWorkgroup(workgroup);
};

export default editWorkgroupUseCase;

import workgroupsService from 'services/workgroup_service';
import WorkgroupEntity from '../entities/WorkgroupEntity';

const listWorkgroupsUseCase = async (): Promise<WorkgroupEntity[]> => {
  return workgroupsService.listWorkgroups();
};

export default listWorkgroupsUseCase;

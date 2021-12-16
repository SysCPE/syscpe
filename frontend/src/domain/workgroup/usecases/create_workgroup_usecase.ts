import workgroupsService from 'services/workgroup_service';
import WorkgroupEntity from '../entities/WorkgroupEntity';

const createWorkgroupUseCase = async (
  name: string,
  description: string,
  creationDate: Date
): Promise<WorkgroupEntity> => {
  return await workgroupsService.createWorkgroup(
    name,
    description,
    creationDate
  );
};

export default createWorkgroupUseCase;

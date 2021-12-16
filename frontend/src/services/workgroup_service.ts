import axios from 'axios';
import WorkgroupEntity from 'domain/workgroup/entities/WorkgroupEntity';
import mapWorkgroupDataToEntity from './mappers/map_workgroup_data_to_entity';
import WorkgroupData from './mappers/workgroup_data';

const workgroupsService = {
  listWorkgroups: async (): Promise<WorkgroupEntity[]> => {
    const response = await axios.get('/workgroups');
    const workgroupsData = response.data.workgroups as WorkgroupData[];

    return workgroupsData
      .map(mapWorkgroupDataToEntity)
      .filter((workgroup) => !workgroup.endDate);
  },
  createWorkgroup: async (
    name: string,
    description: string,
    creationDate: Date
  ): Promise<WorkgroupEntity> => {
    // TODO: Handle non-200 responses! (workgroup name already exists)
    await axios.post('/workgroups', {
      name,
      description,
      creationDate,
    });

    return {
      id: name,
      name: name,
      description: description,
      creationDate: creationDate,
    };
  },
  editWorkgroup: async (workgroup: WorkgroupEntity): Promise<void> => {
    throw new Error('Not implemented');
  },
  endWorkgroup: async (workgroup: WorkgroupEntity): Promise<void> => {
    await axios.post('/workgroups/end-workgroup', { name: workgroup.name });
  },
};

export default workgroupsService;

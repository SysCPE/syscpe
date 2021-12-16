import axios from 'axios';
import MemberEntity from 'domain/members/entities/MemberEntity';
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
    await axios.post('/workgroups/update-workgroup', {
      name: workgroup.name,
      changes: {
        description: workgroup.description,
        creationDate: workgroup.creationDate,
      },
    });
  },
  assignMember: async (
    member: MemberEntity,
    workgroup: WorkgroupEntity
  ): Promise<void> => {
    // TODO: Add proper error handling
    await axios.post('/members/admin/assign-workgroup', {
      memberId: member.idCPE,
      workgroupName: workgroup.name,
    });
  },
  endWorkgroup: async (workgroup: WorkgroupEntity): Promise<void> => {
    await axios.post('/workgroups/end-workgroup', { name: workgroup.name });
  },
};

export default workgroupsService;

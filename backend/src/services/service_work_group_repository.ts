import WorkGroup from "database/models/WorkGroup";
import WorkGroupEntity from "domain/entities/work_group_entity";
import WorkGroupRepository, { WorkGroupAlreadyEndedError, WorkGroupAlreadyExistsError, WorkGroupNotFoundError } from "domain/repository/work_group_repository";
import { ValidationError } from "sequelize";

const ServicesWorkGroupRepository: WorkGroupRepository = {
    getWorkGroup: async function (name: string): Promise<WorkGroupEntity | null> {
        const workgroup = await __getWorkGroupModelByName(name);
        if (!workgroup) return null;
        return __mapWorkGroupModelToEntity(workgroup);
    },

    saveWorkGroup: async function (name: string, description?: string, creationDate?: Date): Promise<WorkGroupEntity> {
        try {
            const workgroup = await WorkGroup.create({
                name: name,
                description: description,
                creationDate: creationDate || new Date(),
            });

            return __mapWorkGroupModelToEntity(workgroup);    
        } catch (error) {
          if (error instanceof ValidationError) {
              throw new WorkGroupAlreadyExistsError(`Work Group ${name} already exists`);
          }
          throw error;
        };
    },

    getAllWorkGroups: async function (): Promise<WorkGroupEntity[]> {
        const workgroups = await __getAllWorkGroupsModels();
        return workgroups.map(__mapWorkGroupModelToEntity);
    },

    endWorkGroup: async function (name: string): Promise<void> {
        const workgroup = await __getWorkGroupModelByName(name);
        if (!workgroup)
            throw new WorkGroupNotFoundError(`Could not find work group ${name}`);

        if (workgroup.endDate)
            throw new WorkGroupAlreadyEndedError(`Work group ${name} already ended at ${workgroup.endDate}`);
        
        await workgroup.update({ endDate: new Date() });
    }
}

const __getWorkGroupModelByName = async (name: string) => {
    const workgroup = await WorkGroup.findOne({
        where: { name: name },
        include: { association: WorkGroup.associations.members },
    });
    
    if (!workgroup) return null;
    return workgroup;
}

const __getAllWorkGroupsModels = async () => {
    const workgroups = await WorkGroup.findAll({
        include: { association: WorkGroup.associations.members },
    });
    return workgroups;
}

const __mapWorkGroupModelToEntity = (workgroup: WorkGroup): WorkGroupEntity => {
    return {
        name: workgroup.name,
        members: workgroup.members?.map((member) => member.memberId) || [],
        creationDate: workgroup.creationDate,
        endDate: workgroup.endDate,
        description: workgroup.description,
    };
}

export default ServicesWorkGroupRepository;
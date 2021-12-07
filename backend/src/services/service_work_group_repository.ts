import WorkGroup from "database/models/WorkGroup";
import WorkGroupEntity from "domain/entities/work_group_entity";
import WorkGroupRepository, { WorkGroupAlreadyExistsError } from "domain/repository/work_group_repository";
import { ValidationError } from "sequelize";

const ServicesWorkGroupRepository: WorkGroupRepository = {
    getWorkGroup: async function (name: string): Promise<WorkGroupEntity | null> {
        throw new Error("Function not implemented.");
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
        const workgroups = await WorkGroup.findAll();
        return workgroups.map(__mapWorkGroupModelToEntity);
    },

    endWorkGroup: async function (name: string): Promise<WorkGroupEntity> {
        throw new Error("Function not implemented.");
    }
}

const __mapWorkGroupModelToEntity = (workgroup: WorkGroup): WorkGroupEntity => {
    return {
        name: workgroup.name,
        creationDate: workgroup.creationDate, 
        description: workgroup.description
    };
};

export default ServicesWorkGroupRepository;
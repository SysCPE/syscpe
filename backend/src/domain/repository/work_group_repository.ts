import WorkGroupEntity from "domain/entities/work_group_entity";

export class WorkGroupNotFoundError extends Error { }

type WorkGroupRepository = {
    getWorkGroup: (name: string) => Promise<WorkGroupEntity | null>;
    
    saveWorkGroup: (name: string, description?: string, creationDate?: Date) => Promise<WorkGroupEntity>;

    getAllWorkGroups: () => Promise<WorkGroupEntity[]>;

    endWorkGroup: (name: string) => Promise<WorkGroupEntity>;
};

export class WorkGroupAlreadyExistsError extends Error {};

export default WorkGroupRepository;